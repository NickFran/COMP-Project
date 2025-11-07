/**
 * Checks a password against the XYZ Company security policy.
 * Policy requires:
 * - At least 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (e.g., !@#$%^&*)
 *
 * @param {string} password - The password to check.
 * @returns {boolean} - True if the password meets all requirements, false otherwise.
 */
function checkPasswordStrength(password) {
    // JavaScript uses regex literals (/pattern/) and the .test() method
    const policyChecks = {
        "length": password.length >= 12,
        "uppercase": /[A-Z]/.test(password),
        "lowercase": /[a-z]/.test(password),
        "number": /[0-9]/.test(password),
        // Note: In a JS regex literal, the backslash \ and forward slash / must be escaped
        "special_char": /[!@#$%^&*()_+=-{};':"\\|,.<>\/?]/.test(password)
    };

    // console.log is the JavaScript equivalent of print
    console.log(`Checking password: '${password}'`);
    
    let allMet = true;
    
    // Use Object.entries to loop through the key-value pairs of the object
    for (const [policy, met] of Object.entries(policyChecks)) {
        if (!met) {
            // Template literals (backticks) are the JS equivalent of f-strings
            console.log(`FAILED: Password does not meet the ${policy} requirement.`);
            allMet = false;
        }
        console.log(`PASSED: ${policy} requirement met.`);
    }
        
    if (allMet) {
        console.log("\nSUCCESS: Password meets all security policy requirements! ✅");
    } else {
        console.log("\nFAILURE: Password is not strong enough. Please try again. ❌");
    }
    
    // We return the boolean result so other functions can use it
    return allMet;
}

/**
 * Handles the login process, limiting attempts to a maximum.
 * This is the new function you requested.
 * @param {number} maxAttempts - The maximum number of allowed attempts.
 */
function handleLoginAttempts(maxAttempts = 3) {
    let attempts = 0;
    console.log(`--- Login Required ---`);
    console.log(`You have ${maxAttempts} attempts to enter a valid password.`);
    
    while (attempts < maxAttempts) {
        // 'prompt' is a simple browser function, similar to Python's 'input()'.
        // For Node.js, you would use the 'readline' module.
        const userPassword = prompt(`Attempt ${attempts + 1}/${maxAttempts} - Enter password:`);
        
        // Handle case where user hits "Cancel" on the prompt
        if (userPassword === null) {
            console.log("Login canceled by user.");
            break; // Exit the loop
        }

        // Check the password strength. The function will log the details.
        const isStrong = checkPasswordStrength(userPassword);
        
        if (isStrong) {
            console.log("\nLogin Successful! Welcome.");
            break; // Exit the loop on success
        } else {
            attempts++;
            if (attempts < maxAttempts) {
                console.log(`\nIncorrect. You have ${maxAttempts - attempts} attempts remaining.`);
            }
        }
    }
    
    // This code runs after the loop finishes
    if (attempts === maxAttempts) {
        console.log("\n--- ACCOUNT LOCKED ---");
        console.log("You have exceeded the maximum number of login attempts. 🔒");
    }
}

// --- NEW TEST RUNNER ---

/**
 * A simple helper function to test our password checker.
 * @param {string} passwordToTest - The password input.
 * @param {boolean} expectedResult - The result (true/false) we expect.
 */
function runTest(passwordToTest, expectedResult) {
    console.log(`--- Testing: "${passwordToTest}" ---`);
    // Get the actual result from your function
    const actualResult = checkPasswordStrength(passwordToTest);
    
    // Compare actual vs. expected
    if (actualResult === expectedResult) {
        console.log(`✅ PASS: Expected ${expectedResult}, Got ${actualResult}\n`);
    } else {
        console.log(`❌ FAIL: Expected ${expectedResult}, Got ${actualResult}\n`);
    }
}

// --- MAIN PROGRAM ---

console.log("===== STARTING AUTOMATED TESTS =====");


// cant prompt for input without additional library 
// handleLoginAttempts(3);



console.log(checkPasswordStrength("WeakPass11111"));          // Too short, no special char);