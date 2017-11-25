from astropy.io import fits
from astropy import units as u
from astropy.coordinates import SkyCoord
from astropy.table import Table, Column
import numpy as np
import matplotlib.pyplot as plt

APOGEE_Distances = "apogee_distances-DR14_2017-04-26.fits"
allStar = "allStar-l31c.2.fits"

data_Distances = fits.getdata(APOGEE_Distances, ext=1)
data_allStar = fits.getdata(allStar, ext=1)

table_Distances = 

# Reads in distance information
# hdu_Distances = fits.open(APOGEE_Distances)[1]
# data_Distances = hdu_Distances.data
# 
# Reads in APOGEE information
# hdu_allStar = fits.open(allStar)[1]
# data_allStar = hdu_allStar.data

# Array that stores data to be saved to csv
header = []
csv_data = []

# Distance Data
csv_data.append(data_Distances["APOGEE_ID"])
header.append("APOGEE_ID")
csv_data.append(data_Distances["ASPACP_ID"])
header.append("ASPACP_ID")
csv_data.append(data_Distances["BPG_dist05"])
header.append("BPG_dist05")
csv_data.append(data_Distances["BPG_dist16"])
header.append("BPG_dist16")
csv_data.append(data_Distances["BPG_dist50"])
header.append("BPG_dist50")
csv_data.append(data_Distances["BPG_dist84"])
header.append("BPG_dist84")
csv_data.append(data_Distances["BPG_dist95"])
header.append("BPG_dist95")
csv_data.append(data_Distances["BPG_meandist"])
header.append("BPG_meandist")
csv_data.append(data_Distances["BPG_diststd"])
header.append("BPG_diststd")
csv_data.append(data_Distances["BPG_AV05"])
header.append("BPG_AV05")
csv_data.append(data_Distances["BPG_AV16"])
header.append("BPG_AV16")
csv_data.append(data_Distances["BPG_AV50"])
header.append("BPG_AV50")
csv_data.append(data_Distances["BPG_AV84"])
header.append("BPG_AV84")
csv_data.append(data_Distances["BPG_AV95"])
header.append("BPG_AV95")
csv_data.append(data_Distances["BPG_meanAV"])
header.append("BPG_meanAV")
csv_data.append(data_Distances["BPG_AVstd"])
header.append("BPG_AVstd")
#csv_data.append(data_Distances["BPG_INPUTFLAGS"])
#header.append("BPG_INPUTFLAGS")
csv_data.append(data_Distances["BPG_OUTPUTFLAGS"])
header.append("BPG_OUTPUTFLAGS")
csv_data.append(data_Distances["NAOC_dist"])
header.append("NAOC_dist")
csv_data.append(data_Distances["NAOC_err_dist"])
header.append("NAOC_err_dist")
csv_data.append(data_Distances["NAOC_parallax"])
header.append("NAOC_parallax")
csv_data.append(data_Distances["NAOC_err_parallax"])
header.append("NAOC_err_parallax")
csv_data.append(data_Distances["NAOC_AK"])
header.append("NAOC_AK")
csv_data.append(data_Distances["NAOC_err_AK"])
header.append("NAOC_err_AK")
csv_data.append(data_Distances["NICE_dist"])
header.append("NICE_dist")
csv_data.append(data_Distances["NICE_err_dist"])
header.append("NICE_err_dist")
csv_data.append(data_Distances["NICE_E_JK"])
header.append("NICE_E_JK")
# APOGEE_ID = data_Distances["APOGEE_ID"]
# ASPCAP_ID = data_Distances["ASPACP_ID"]
# BPG_dist05 = data_Distances["BPG_dist05"]
# BPG_dist16 = data_Distances["BPG_dist16"]
# BPG_dist50 = data_Distances["BPG_dist50"]
# BPG_dist84 = data_Distances["BPG_dist84"]
# BPG_dist95 = data_Distances["BPG_dist95"]
# BPG_meandist = data_Distances["BPG_meandist"]
# BPG_diststd = data_Distances["BPG_diststd"]
# BPG_AV05 = data_Distances["BPG_AV05"]
# BPG_AV16 = data_Distances["BPG_AV16"]
# BPG_AV50 = data_Distances["BPG_AV50"]
# BPG_AV84 = data_Distances["BPG_AV84"]
# BPG_AV95 = data_Distances["BPG_AV95"]
# BPG_meanAV = data_Distances["BPG_meanAV"]
# BPG_AVstd = data_Distances["BPG_AVstd"]
# BPG_INPUTFLAGS = data_Distances["BPG_INPUTFLAGS"]
# BPG_OUTPUTFLAGS = data_Distances["BPG_OUTPUTFLAGS"]
# NAOC_dist = data_Distances["NAOC_dist"]
# NAOC_err_dist = data_Distances["NAOC_err_dist"]
# NAOC_parallax = data_Distances["NAOC_parallax"]
# NAOC_err_parallax = data_Distances["NAOC_err_parallax"]
# NAOC_AK = data_Distances["NAOC_AK"]
# NAOC_err_AK = data_Distances["NAOC_err_AK"]
# NICE_dist = data_Distances["NICE_dist"]
# NICE_err_dist = data_Distances["NICE_err_dist"]
# NICE_E_JK = data_Distances["NICE_E_JK"]
#NMSU_dist = data_Distances["NMSU_dist"]
#NMSU_dist_err = data_Distances["NMSU_dist_err"]
#NMSU_dist_prior = data_Distances["NMSU_dist_prior"]
#NMSU_dist_prior_err = data_Distances["NMSU_dist_prior_err"]

# allStar Data
csv_data.append(data_allStar["DEC"])
header.append("DEC")
csv_data.append(data_allStar["RA"])
header.append("RA")
csv_data.append(data_allStar["TEFF"])
header.append("TEFF")
csv_data.append(data_allStar["LOGG"])
header.append("LOGG")
csv_data.append(data_allStar["VMICRO"])
header.append("VMICRO")
csv_data.append(data_allStar["VMACRO"])
header.append("VMACRO")
csv_data.append(data_allStar["VSINI"])
header.append("VSINI")
csv_data.append(data_allStar["M_H"])
header.append("M_H")
csv_data.append(data_allStar["ALPHA_M"])
header.append("ALPHA_M")
csv_data.append(data_allStar["C_FE"])
header.append("C_FE")
csv_data.append(data_allStar["CI_FE"])
header.append("CI_FE")
csv_data.append(data_allStar["N_FE"])
header.append("N_FE")
csv_data.append(data_allStar["O_FE"])
header.append("O_FE")
csv_data.append(data_allStar["NA_FE"])
header.append("NA_FE")
csv_data.append(data_allStar["MG_FE"])
header.append("MG_FE")
csv_data.append(data_allStar["AL_FE"])
header.append("AL_FE")
csv_data.append(data_allStar["SI_FE"])
header.append("SI_FE")
csv_data.append(data_allStar["P_FE"])
header.append("P_FE")
csv_data.append(data_allStar["S_FE"])
header.append("S_FE")
csv_data.append(data_allStar["K_FE"])
header.append("K_FE")
csv_data.append(data_allStar["CA_FE"])
header.append("CA_FE")
csv_data.append(data_allStar["TI_FE"])
header.append("TI_FE")
csv_data.append(data_allStar["V_FE"])
header.append("V_FE")
csv_data.append(data_allStar["CR_FE"])
header.append("CR_FE")
csv_data.append(data_allStar["MN_FE"])
header.append("MN_FE")
csv_data.append(data_allStar["FE_H"])
header.append("FE_H")
csv_data.append(data_allStar["CO_FE"])
header.append("CO_FE")
csv_data.append(data_allStar["NI_FE"])
header.append("NI_FE")
csv_data.append(data_allStar["GE_FE"])
header.append("GE_FE")
csv_data.append(data_allStar["RB_FE"])
header.append("RB_FE")
csv_data.append(data_allStar["Y_FE"])
header.append("Y_FE")
csv_data.append(data_allStar["ND_FE"])
header.append("ND_FE")

# Gets APOGEE_ID from distance file to cross match with allStar file
APOGEE_ID = data_Distances["APOGEE_ID"]
N = len(APOGEE_ID)
L = len(csv_data)

# Converts RA, DEC, and distance to galactic center cord.
ra_list = data_allStar["RA"]
dec_list = data_allStar["DEC"]
dis_list = data_Distances["NAOC_dist"]
c = SkyCoord(ra = ra_list*u.degree, dec = dec_list*u.degree, distance = dis_list)
cartX = c.cartesian.x.value
cartY = c.cartesian.y.value
cartZ = c.cartesian.z.value
# Appends x, y, and z coordinates
index = []
for i in range(0, len(cartZ)):
    k = len(cartZ)-1-i
    if cartZ[k] >= - 2 and cartZ[k] <= 2:
        continue
    else:
        index.append(k)

for i in index:
    cartX = np.delete(cartX, i)
    cartY = np.delete(cartY, i)

print len(cartX)
plt.scatter(cartX, cartY)
plt.show()
    
# Save to csv file
#with file("CrossMatch.csv", "w") as outfile:
#    for l in csv_data:
#        print len(l)
#        np.savetxt(outfile, l)
# Saves the head to the CSV file
csvfile = open("CrossMatch.csv", "w")
for h in range(0, L):
    if h == L-1:
        csvfile.write("%s\n" %header[h])
    else:
        csvfile.write("%s," %header[h])
# Saves data to the CSV file
for i in range(0, N/10000):
    for j in range(0, L):
        if j == L-1:
            csvfile.write("%s\n" %csv_data[j][i])
        else:
            csvfile.write("%s," %csv_data[j][i])
csvfile.close()

#for i in range(0, N):
#    np.savetxt('%s_x1d_Order%s.txt' %(DataName, N-i), np.dstack((WVL[i], FLUX[i]))[0])
#    np.savetxt('%s_x1d_Order%s.err' %(DataName, N-i), np.dstack((WVL[i], FLUX[i], ERROR[i]))[0])
