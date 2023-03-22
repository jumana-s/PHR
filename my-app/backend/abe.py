from charm.toolbox.pairinggroup import PairingGroup
from charm.schemes.abenc.abenc_bsw07 import CPabe_BSW07
from charm.adapters.abenc_adapt_hybrid import *
from charm.core.engine.util import objectToBytes, bytesToObject
from os import path


class abe:
    def __init__(self):
        self.group = PairingGroup('SS512')
        self.cp = HybridABEnc(CPabe_BSW07(self.group), self.group) 

        # Check if master keys exist, if not create and write to file
        if path.exists("mpk.txt") == False or path.exists("mk.txt") == False:
            pk, mk = self.cp.setup()
            
            out_mpk = open("mpk.txt", "wb")
            out_mpk.write(objectToBytes(pk, self.group))
            out_mpk.close()

            out_mk = open("mk.txt", "wb")
            out_mk.write(objectToBytes(mk, self.group))
            out_mk.close() 

        in_mpk = open("mpk.txt", "rb")
        self.pk = bytesToObject(in_mpk.read(), self.group)
        in_mpk.close()

        in_mk = open("mk.txt", "rb")
        self.mk = bytesToObject(in_mk.read(), self.group)
        in_mk.close()

    def keygen(self, attr):
        return self.cp.keygen(self.pk, self.mk, attr)
    
    def encrypt(self, phr, policy):
        m = phr.encode()
        return objectToBytes(self.cp.encrypt(self.pk, m, policy), self.group)
    
    def decrypt(self, sk, ciphertext):
        cp = bytesToObject(ciphertext, self.group)
        return self.cp.decrypt(self.pk, sk, cp)