from charm.toolbox.pairinggroup import PairingGroup,ZR,G1,G2,GT,pair

def test():
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