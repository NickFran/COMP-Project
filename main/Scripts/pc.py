from random import randint as RandomInteger
import time

#Set a password to a random number (in our range)
password = RandomInteger(0, 999)

#Say the password
print("Password Is: ",password)
time.sleep(1)

#Find The Password
counter = 0
while counter != password:
        print("-x-",counter,"-x-")
        counter += 1

print("Done")
