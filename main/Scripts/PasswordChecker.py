import re

def check_password_strength(password):
    """
    Checks a password against the XYZ Company security policy.
    Policy requires:
    - At least 12 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character (e.g., !@#$%^&*)
    """
    policy_checks = {
        "length": len(password) >= 12,
        "uppercase": re.search(r"[A-Z]", password) is not None,
        "lowercase": re.search(r"[a-z]", password) is not None,
        "number": re.search(r"[0-9]", password) is not None,
        "special_char": re.search(r"[!@#$&_?]", password) is not None
    }

    print(f"Checking password: '{password}'")
    
    all_met = True
    for policy, met in policy_checks.items():
        if not met:
            print(f"FAILED: Password does not meet the {policy} requirement.")
            all_met = False
            
    if all_met:
        print("\nSUCCESS: Password meets all security policy requirements! ✅")
    else:
        print("\nFAILURE: Password is not strong enough. Please try again. ❌")

# --- Main Program ---
if __name__ == "__main__":
    user_password = input("Enter the password you want to check: ")
    check_password_strength(user_password)
