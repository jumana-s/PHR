from charm.toolbox.pairinggroup import PairingGroup,ZR,G1,G2,GT,pair
from charm.schemes.abenc.abenc_bsw07 import CPabe_BSW07


class abe:
    def __init__(self):
        self.group = PairingGroup('SS512')
        self.cp = CPabe_BSW07(self.group)
        self.pk, self.mk = self.cp.setup()

    def keygen(self, attr):
        return self.cp.keygen(self.pk, self.mk, attr)
    
    def encrypt(self, phr, policy):
        m = phr.encode()
        return self.cp.encrypt(self.pk, m, policy)
    
    def decrypt(self, sk, ciphertext):
        return self.cp.decrypt(self.pk, sk, ciphertext)

'''
    group = PairingGroup('SS512')
    cpabe = CPabe_BSW07(group)
    msg = group.random(GT)
    attributes = ['ONE', 'TWO', 'THREE']
    access_policy = '((four or three) and (three or one))'
    (master_public_key, master_key) = cpabe.setup()
    secret_key = cpabe.keygen(master_public_key, master_key, attributes)
    cipher_text = cpabe.encrypt(master_public_key, msg, access_policy)
    decrypted_msg = cpabe.decrypt(master_public_key, secret_key, cipher_text)
    return msg == decrypted_msg

    '''