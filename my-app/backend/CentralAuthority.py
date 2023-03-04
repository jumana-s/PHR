from charm.schemes.abenc.abenc_waters09 import CPabe09
from charm.toolbox.pairinggroup import PairingGroup,GT
from charm.toolbox.conversion import Conversion

class CpAbe:
    def __init__(self) -> None:
        #nothing to initialize in central authority yet
        pass

    def setup(self):
        print("setup trigger") 
    
    def encrypt(self):
        print("encrypt trigger")
    
    def key_gen(self):
        print("keygen trigger")

    def decrypt(self):
        print("decrypt trigger")
    
    def delegate(self):
        print("delegate trigger")