from astropy.io import fits
from astropy import units as u
from astropy.coordinates import SkyCoord
from astropy.table import Table, Column
import numpy as np
import math

APOGEE_Distances = "apogee_distances-DR14_2017-04-26.fits"
allStar = "allStar-l31c.2.fits"

# Fits data is stored as a record array
data_Distances = fits.getdata(APOGEE_Distances, ext=1)
data_allStar = fits.getdata(allStar, ext=1)

# Converts record array to table
Distances_Columns =['NAOC_dist', 'NAOC_err_dist']
allStar_Columns = ['RA', 'DEC', 'TEFF', 'LOGG', 'VMICRO', 'VMACRO', 'M_H', 'ALPHA_M', 'C_FE', 'CI_FE', 'N_FE', 'O_FE', 'NA_FE', 'MG_FE', 'AL_FE', 'SI_FE', 'P_FE', 'S_FE', 'K_FE', 'CA_FE', 'TI_FE', 'TIII_FE', 'V_FE', 'CR_FE', 'MN_FE', 'FE_H', 'CO_FE', 'NI_FE']

table_Distances = Table(data_Distances)[Distances_Columns]
table_allStar = Table(data_allStar)[allStar_Columns]

# Goes through Distance columns and adds them to all star table
for col in Distances_Columns:
    table_allStar.add_column(table_Distances[col])

# Removes objects with no distance measurements
table_allStar = table_allStar[~np.isnan(table_allStar['NAOC_dist'])]

# Converts RA, DEC, and distance to galactic center cord.
cord = SkyCoord(ra = table_allStar['RA']*u.degree, dec = table_allStar['DEC']*u.degree, distance = table_allStar['NAOC_dist']*u.kpc)
# Adds x, y, and z coordinates to table_allStar
xCol = Column(name = 'xCartesian', data = cord.cartesian.x.value)
yCol = Column(name = 'yCartesian', data = cord.cartesian.y.value)
zCol = Column(name = 'zCartesian', data = cord.cartesian.z.value)
table_allStar.add_columns([xCol, yCol, zCol])

# Filters any positions that are above the thick bulge that is ~4(kpc) thick
table_allStar = table_allStar[table_allStar['zCartesian'] <= 2]
table_allStar = table_allStar[table_allStar['zCartesian'] >= -2]

# Filters any stars that are outside 25,000(lyr) ~= 7.5(kpc) from the Sun
table_allStar = table_allStar[(table_allStar['xCartesian']*table_allStar['xCartesian']+table_allStar['yCartesian']*table_allStar['yCartesian']+table_allStar['zCartesian']*table_allStar['zCartesian'] <= 7.5*7.5)]

# Filters out Fe_H that are -9999
table_allStar = table_allStar[table_allStar['FE_H'] != -9999]
# Filters out any rows with -9999 values
#table_allStar = table_allStar[table_allStar != -9999]
Abundance = ['ALPHA_M', 'C_FE', 'CI_FE', 'N_FE', 'O_FE', 'NA_FE', 'MG_FE', 'AL_FE', 'SI_FE', 'P_FE', 'S_FE', 'K_FE', 'CA_FE', 'TI_FE', 'TIII_FE', 'V_FE', 'CR_FE', 'MN_FE', 'FE_H', 'CO_FE', 'NI_FE']
for A in Abundance:
    table_allStar = table_allStar[table_allStar[A] != -9999]

# Save to csv file
table_allStar.write('Data.csv', format='ascii.csv', overwrite=True)

#######
# Clusters stars together and averages each column
#######
# finds max circle radius
l = max([max(np.abs(table_allStar['xCartesian'])), max(np.abs(table_allStar['yCartesian']))])

# differential size of grid
N = 30
dl = 2.0*l/N

Columns = ['TEFF', 'LOGG', 'VMICRO', 'M_H', 'ALPHA_M', 'C_FE', 'CI_FE', 'N_FE', 'O_FE', 'NA_FE', 'MG_FE', 'AL_FE', 'SI_FE', 'P_FE', 'S_FE', 'K_FE', 'CA_FE', 'TI_FE', 'TIII_FE', 'V_FE', 'CR_FE', 'MN_FE', 'FE_H', 'CO_FE', 'NI_FE']

ClusterKeys = ['TEFF', 'LOGG', 'VMICRO', 'M_H', 'ALPHA_M', 'C_FE', 'CI_FE', 'N_FE', 'O_FE', 'NA_FE', 'MG_FE', 'AL_FE', 'SI_FE', 'P_FE', 'S_FE', 'K_FE', 'CA_FE', 'TI_FE', 'TIII_FE', 'V_FE', 'CR_FE', 'MN_FE', 'FE_H', 'CO_FE', 'NI_FE', 'NumberOfStars', 'xLocation', 'yLocation']

table_cluster = Table(names=ClusterKeys)

ClusterRows = []
for x in range(0, N):
    for y in range(0, N):
        currentRow = []
        current = table_allStar[table_allStar['xCartesian'] <= -l + (x + 1)*dl]
        current = current[current['xCartesian'] >= -l + x*dl]
        current = current[current['yCartesian'] <= -l + (y + 1)*dl]
        current = current[current['yCartesian'] >= -l + y*dl]

        if len(current) != 0:
            for col in Columns:
                currentRow.append( np.average(current[col]) )

            currentRow.append(len(current))
            currentRow.append(-l + x*dl + dl/2.0)
            currentRow.append(-l + y*dl + dl/2.0)

            ClusterRows.append(currentRow)

for row in ClusterRows:
    table_cluster.add_row(row)

# Save to csv file
table_allStar.write('ClusterData.csv', format='ascii.csv', overwrite=True)