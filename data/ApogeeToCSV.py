from astropy.io import fits
import numpy as np

FileName = "apogee_distances-DR14_2017-04-26.fits"

hdu = fits.open(FileName)[1]
data = hdu.data

APOGEE_ID = data["APOGEE_ID"]
ASPCAP_ID = data["ASPACP_ID"]
BPG_dist05 = data["BPG_dist05"]
BPG_dist16 = data["BPG_dist16"]
BPG_dist50 = data["BPG_dist50"]
BPG_dist84 = data["BPG_dist84"]
BPG_dist95 = data["BPG_dist95"]
BPG_meandist = data["BPG_meandist"]
BPG_diststd = data["BPG_diststd"]
BPG_AV05 = data["BPG_AV05"]
BPG_AV16 = data["BPG_AV16"]
BPG_AV50 = data["BPG_AV50"]
BPG_AV84 = data["BPG_AV84"]
BPG_AV95 = data["BPG_AV95"]
BPG_meanAV = data["BPG_meanAV"]
BPG_AVstd = data["BPG_AVstd"]
BPG_INPUTFLAGS = data["BPG_INPUTFLAGS"]
BPG_OUTPUTFLAGS = data["BPG_OUTPUTFLAGS"]
NAOC_dist = data["NAOC_dist"]
NAOC_err_dist = data["NAOC_err_dist"]
NAOC_parallax = data["NAOC_parallax"]
NAOC_err_parallax = data["NAOC_err_parallax"]
NAOC_AK = data["NAOC_AK"]
NAOC_err_AK = data["NAOC_err_AK"]
NICE_dist = data["NICE_dist"]
NICE_err_dist = data["NICE_err_dist"]
NICE_E_JK = data["NICE_E_JK"]
#NMSU_dist = data["NMSU_dist"]
#NMSU_dist_err = data["NMSU_dist_err"]
#NMSU_dist_prior = data["NMSU_dist_prior"]
#NMSU_dist_prior_err = data["NMSU_dist_prior_err"]

N = np.shape(APOGEE_ID)[0]

#for i in range(0, N):
#    np.savetxt('%s_x1d_Order%s.txt' %(DataName, N-i), np.dstack((WVL[i], FLUX[i]))[0])
#    np.savetxt('%s_x1d_Order%s.err' %(DataName, N-i), np.dstack((WVL[i], FLUX[i], ERROR[i]))[0])
