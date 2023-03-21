from charm.toolbox.pairinggroup import PairingGroup
from charm.schemes.abenc.abenc_bsw07 import CPabe_BSW07
from charm.adapters.abenc_adapt_hybrid import *
from charm.core.engine.util import objectToBytes, bytesToObject


class abe:
    def __init__(self):
        group = PairingGroup('SS512')
        self.cp = HybridABEnc(CPabe_BSW07(group), group) 
        self.pk, self.mk = self.cp.setup()

    def keygen(self, attr):
        return self.cp.keygen(self.pk, self.mk, attr)
    
    def encrypt(self, phr, policy):
        m = phr.encode()
        return self.cp.encrypt(self.pk, m, policy)
    
    def decrypt(self, sk, ciphertext):
        return self.cp.decrypt(self.pk, sk, ciphertext)