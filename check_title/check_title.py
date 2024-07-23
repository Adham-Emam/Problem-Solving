def checkTitle(string):
    # Convert to List
    string = string.split(' ')
    
    # if word is upper continue, if not end loop and return False 
    for word in string:
        if not word[0].isupper():
            return False
    return True

# Test Cases
print(checkTitle("A Mind Boggling Achievement"))  # true
print(checkTitle("A Simple C++ Program!"))  # true
print(checkTitle("Water is transparent"))  # false
