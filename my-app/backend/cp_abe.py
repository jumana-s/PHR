from charm.toolbox.ABEnc import ABEnc
from charm.schemes.abenc.abenc_bsw07 import CPabe_BSW07
from charm.toolbox.pairinggroup import PairingGroup,GT
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction
from charm.core.math.pairing import hashPair as sha2
from charm.core.engine.util import *
from math import ceil
from ast import literal_eval
from socket import *
from charm.adapters.abenc_adapt_hybrid import *
import collections
import os

# setup cp-abe, generate master keys and save to file
def setup():
    group = PairingGroup("SS512")
    cpabe = CPabe_BSW07(group)
    hyb_abe = HybridABEnc(cpabe, group)
    master_public_key, master_key = hyb_abe.setup()

    file = open("keys.txt", "w")
    file.write(master_public_key)
    file.write(master_key)
    file.close()

    return master_public_key, master_key

# return master keys, if generated read from file or run setup function
def get_master_keys():
    if(not os.path.exists("keys.txt")):
        mpk, mk = setup()
        return mpk, mk
    else:
        with open("keys.txt", "r") as read:
            mpk = read.readline()
            mk = read.readline()

            return mpk, mk

def encrypt(phr, policy):
    group = PairingGroup("SS512")
    cpabe = CPabe_BSW07(group)
    hyb_abe = HybridABEnc(cpabe, group)

    # get master public key then encrypt phr
    mpk, _ = get_master_keys()
    cipher_text = hyb_abe.encrypt(mpk, phr.encode(), policy)

    return cipher_text

def decrypt(cipher_text, attributes):
    group = PairingGroup("SS512")
    cpabe = CPabe_BSW07(group)
    hyb_abe = HybridABEnc(cpabe, group)

    mpk, mk = get_master_keys()

    # create secret key based on user attributes
    attr = list(set(literal_eval(attributes)))
    sk = hyb_abe.keygen(mpk, mk, attr)

    # decrypt, if fail return error message
    try:
        phr = hyb_abe.decrypt(mpk, sk, cipher_text).decode()
        return 1, phr
    except:
        return 2, "User can't access this PHR."





    