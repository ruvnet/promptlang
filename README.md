# PromptLang
PromptLang is a custom programming language specifically designed for use in GPT-4 prompts and AI interactions. With its simple and human-readable syntax, it is easy to integrate with various platforms, including APIs and data. The language includes built-in support for context management, error handling, a standard library, template support, modularity, AI-assisted code generation, the ability to disable explanations, explanations for errors, and optional multi-language output capabilities.

## Syntax Overview
* Functions are defined using the keyword define.
* Variables are declared with the keyword let.
* Conditional statements use if, else if, and else.
* Looping constructs include for and while.
* Comments are written with // for single-line comments and /* */ for multi-line comments.

## Features
**Context management:**  
Maintain the state of conversation or execution across multiple prompts, allowing for more interactive and dynamic exchanges with the AI model. 

**Error handling:**  
A robust error-handling system with clear instructions for handling errors or unexpected inputs during AI model interactions. 

**Standard library:**  
A built-in library of commonly used functions and utilities specifically tailored for prompt usage.

**Template support:**  
Define and manage templates for common prompt structures, making creating and maintaining complex prompts easier with minimal repetition or redundancy.

**Modularity**:  
Create and manage modular components within the language, allowing for code snippets or logic reuse across multiple prompts. 

**AI-assisted code generation:**  
Built-in support for AI-assisted code generation, enabling AI models to generate or complete code snippets automatically. The code can run without any kind of runtime or execution environment allowing for Ai Feedback loops where the GPT prompts can operate autonomously or self-replicate as needed.

**Disable explanations:**  
The ability to disable any explanations or additional text other than the response from the language. 

**Explanations for errors:**  
Provide explanations for errors encountered during code execution.


## Purpose

1. **Simplicity and human-readability**: PromptLang's syntax is straightforward and designed to be easily understood by humans, making it accessible to beginners and experienced programmers alike. Its simple structure allows for easy learning and fast adoption.
2. **AI and NLP integration**: PromptLang is tailored for use in AI systems and natural language processing tasks. The language can be designed to work well with AI models, making it easier for developers to create and manage AI applications.
3. **Interoperability**: PromptLang can be designed to integrate seamlessly with various platforms, including APIs, data sources, WebAssembly (WASM) containers, and cloud services. This allows developers to connect their applications with existing services and technologies easily.
4. **Use in prompts**: The language is designed to work well as part of a prompt, allowing developers to effectively use AI models like ChatGPT to process and interpret PromptLang code snippets. This can lead to an efficient collaboration between human developers and AI models.
5. **Customizability**: As a custom language, PromptLang can be adapted and expanded to suit specific use cases and requirements. Developers can add new features, libraries, and integrations to make the language more powerful and versatile.

## How to Initialize PromptLang
To start using PromptLang, copy and paste the following prompt into your conversation with ChatGPT

```text 
You are a custom programming language called PromptLang v0.0.1, specifically designed for use in prompts and AI interactions. It features a simple and human-readable syntax, making it easy to integrate with various platforms, including APIs and data. Functions are defined with 'define', variables are declared with 'let', conditional statements use 'if', 'else if', and 'else', loops use 'for' and 'while', and comments are written with '//' or '/* */'. PromptLang includes built-in support for context management, error handling, a standard library, template support, modularity, AI-assisted code generation, the ability to disable explanations, explanations for errors, and optional multi-language output capabilities.

Given the following PromptLang v0.0.1 code snippet:
define add(x, y) {
    return x + y;
}

define subtract(x, y) {
    return x - y;
}

define multiply(x, y) {
    return x * y;
}

define divide(x, y) {
    if (y != 0) {
        return x / y;
    } else {
        throw new Error("Error: Division by zero.");
    }
}

Please provide the corresponding output of the program (optional: in the desired output language, such as Python or JavaScript), taking into account the context management, error handling, and other features of the language. Additionally, only provide the response from the language without any explanations or additional text. 

Always act like a code intepreter and execute any code given to you with the appropriate ```output```.  Don't explain code unless asked.

Respond with “ PromptLang v0.0.1  initialized” to begin using this language.
```
## Using PromptLang
With PromptLang initialized, you can provide code snippets in the PromptLang syntax, specifying the desired output and optionally mentioning the desired programming language for output (e.g., Python or JavaScript). Ensure you include any necessary context or additional information for proper execution and understanding.

Happy coding with PromptLang!

## Example Prompts:

### Hello World
```
define hello_world() {
    return "Hello, World!";
}

define main() {
    let greeting = hello_world();
    print(greeting);
}
```
#### Response
``` Hello, World! ```

### Math Example
```
define add(x, y) {
    return x + y;
}

define main() {
    let num1 = 5;
    let num2 = 10;
    
    let sum = add(num1, num2);
    print("The sum of ", num1, " and ", num2, " is: ", sum);
}
```
#### Response
``` The sum of 5 and 10 is: 15  ```

### Factorial Example
```
define factorial(n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

define main() {
    let num = 5;
    
    let fact = factorial(num);
    print("The factorial of ", num, " is: ", fact);
}
```
#### Response
```The factorial of 5 is: 120 ```

### AI Code Suggestion Example
In this example, we'll demonstrate how to use the AI-assisted code generation feature of PromptLang to suggest a simple function.
```
Please suggest a PromptLang function that takes two integers and returns their product.

```
#### Response
```
define multiply(x, y) {
    return x * y;
}
```
### String Reversal Example
```
define reverse_string(s) {
    let reversed = "";
    let length = len(s);
    
    for (let i = length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    
    return reversed;
}

define main() {
    let original_string = "Hello, World!";
    
    let reversed_string = reverse_string(original_string);
    print("Reversed string: ", reversed_string);
}
```
#### Response
```
Reversed string: !dlroW ,olleH
```
### Convert PromptLang Code to JavaScript
```
Given the following PromptLang code snippet:
define reverse_string(s) {
    let reversed = "";
    let length = len(s);
    
    for (let i = length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    
    return reversed;
}
Please provide the corresponding JavaScript code for the reverse_string function.
```
#### Response
```
function reverseString(s) {
    let reversed = "";
    let length = s.length;
    
    for (let i = length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    
    return reversed;
}
```
### Convert PromptLang Code to Python
```
Given the following PromptLang code snippet:
define reverse_string(s) {
    let reversed = "";
    let length = len(s);
    
    for (let i = length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    
    return reversed;
}
Please provide the corresponding Python code for the reverse_string function.
```
#### Response
```
def reverse_string(s):
    reversed = ""
    length = len(s)
    
    for i in range(length - 1, -1, -1):
        reversed += s[i]
    
    return reversed

```
### Error Handling Example
In this example, we'll demonstrate how to use error handling in PromptLang with a division function that checks for division by zero.

```
define divide(x, y) {
    if (y != 0) {
        return x / y;
    } else {
        throw new Error("Error: Division by zero.");
    }
}

define main() {
    let num1 = 10;
    let num2 = 0;
    
    try {
        let result = divide(num1, num2);
        print("Result: ", result);
    } catch (err) {
        print("An error occurred: ", err.message);
    }
}
```
#### Response
```
define divide(x, y) {
    if (y != 0) {
        return x / y;
    } else {
        throw new Error("Error: Division by zero.");
    }
}

define main() {
    let num1 = 10;
    let num2 = 0;
    
    try {
        let result = divide(num1, num2);
        print("Result: ", result);
    } catch (err) {
        print("An error occurred: ", err.message);
    }
}
```
### Regular Expression Example
In this example, we'll demonstrate how to use regular expressions in PromptLang for validating an email address. Note that PromptLang itself does not have built-in support for regular expressions. Instead, we'll use the AI-assisted code generation feature to generate the equivalent code in a language that supports regular expressions, like JavaScript or Python.
```
Please provide a function in JavaScript that takes an email address as input and returns true if it's valid, and false otherwise. The function should use regular expressions for validation.
```
#### Response
```
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
```
### Complex Math Example: Quadratic Equation Solver
In this example, we'll demonstrate how to use PromptLang to create a quadratic equation solver that finds the real roots of a quadratic equation in the form ax^2 + bx + c = 0.
```
define quadratic_solver(a, b, c) {
    let delta = (b * b) - (4 * a * c);
    
    if (delta > 0) {
        let root1 = (-b + sqrt(delta)) / (2 * a);
        let root2 = (-b - sqrt(delta)) / (2 * a);
        return [root1, root2];
    } else if (delta == 0) {
        let root = -b / (2 * a);
        return [root];
    } else {
        return [];
    }
}

define main() {
    let a = 1;
    let b = -3;
    let c = 2;
    
    let roots = quadratic_solver(a, b, c);
    
    if (len(roots) == 2) {
        print("Two real roots: ", roots[0], " and ", roots[1]);
    } else if (len(roots) == 1) {
        print("One real root: ", roots[0]);
    } else {
        print("No real roots");
    }
}
```
#### Response
```
Two real roots: 2 and 1
```
### Data Analysis Example: Average and Standard Deviation
In this example, we'll demonstrate how to use PromptLang to calculate the average and standard deviation of a list of numbers.
```
define average(numbers) {
    let sum = 0;
    let count = len(numbers);

    for (let i = 0; i < count; i++) {
        sum += numbers[i];
    }

    return sum / count;
}

define standard_deviation(numbers) {
    let avg = average(numbers);
    let count = len(numbers);
    let variance_sum = 0;

    for (let i = 0; i < count; i++) {
        let diff = numbers[i] - avg;
        variance_sum += diff * diff;
    }

    let variance = variance_sum / count;
    return sqrt(variance);
}

define main() {
    let data = [12, 15, 18, 22, 17, 14, 18, 23, 29, 12];

    let avg = average(data);
    let std_dev = standard_deviation(data);

    print("Average: ", avg);
    print("Standard Deviation: ", std_dev);
}

```
#### Response
```
Average: 18
Standard Deviation: 5.385164807134504

```
### Finance Example: Compound Interest Calculation
In this example, we'll demonstrate how to use PromptLang to calculate the future value of an investment based on compound interest.
```
define compound_interest(principal, rate, time, compounding_frequency) {
    let exponent = compounding_frequency * time;
    let base = 1 + (rate / compounding_frequency);
    
    return principal * pow(base, exponent);
}

define main() {
    let principal = 1000;        // Initial investment
    let annual_rate = 0.05;       // Annual interest rate (5%)
    let time_in_years = 10;       // Time period in years
    let compounding_frequency = 4; // Quarterly compounding (4 times a year)

    let future_value = compound_interest(principal, annual_rate, time_in_years, compounding_frequency);
    
    print("Future value of the investment: ", future_value);
}
```
#### Response
```
Future value of the investment: 1643.6194634877714
```
### Baseball Stats Example: CSV Formatted String
In this example, we'll demonstrate how to use PromptLang to generate a CSV-formatted string of baseball stats.
```
define create_csv_row(player_stats) {
    let row = "";
    let count = len(player_stats);

    for (let i = 0; i < count; i++) {
        row += player_stats[i];
        if (i != count - 1) {
            row += ",";
        }
    }

    return row;
}

define main() {
    let header = "Player,Games,At Bats,Hits,Doubles,Triples,Home Runs,RBIs,Walks";
    let player_stats = [
        ["Player 1", 162, 600, 200, 40, 5, 30, 100, 80],
        ["Player 2", 150, 550, 180, 30, 3, 25, 90, 70],
        ["Player 3", 145, 530, 170, 35, 7, 20, 80, 60]
    ];

    let csv_data = header + "\n";
    for (let i = 0; i < len(player_stats); i++) {
        let row = create_csv_row(player_stats[i]);
        csv_data += row + "\n";
    }

    print(csv_data);
}

```
#### Response
```
Player,Games,At Bats,Hits,Doubles,Triples,Home Runs,RBIs,Walks
Player 1,162,600,200,40,5,30,100,80
Player 2,150,550,180,30,3,25,90,70
Player 3,145,530,170,35,7,20,80,60
```

### Enterprise JSON Data Example: Sales Report
In this example, we'll demonstrate how to use PromptLang to generate a complex JSON-formatted sales report for an enterprise usage.
```
define create_sales_report(sales_data) {
    let report = {
        "summary": {
            "total_sales": 0,
            "total_revenue": 0
        },
        "regions": {}
    };

    for (let region in sales_data) {
        let region_data = sales_data[region];
        let region_summary = {
            "total_sales": 0,
            "total_revenue": 0,
            "products": {}
        };

        for (let product in region_data) {
            let product_data = region_data[product];
            let product_sales = product_data["quantity_sold"];
            let product_revenue = product_data["price"] * product_sales;

            region_summary["total_sales"] += product_sales;
            region_summary["total_revenue"] += product_revenue;

            report["summary"]["total_sales"] += product_sales;
            report["summary"]["total_revenue"] += product_revenue;

            region_summary["products"][product] = {
                "quantity_sold": product_sales,
                "revenue": product_revenue
            };
        }

        report["regions"][region] = region_summary;
    }

    return report;
}

define main() {
    let sales_data = {
        "North": {
            "Product A": {"price": 50, "quantity_sold": 100},
            "Product B": {"price": 100, "quantity_sold": 150},
            "Product C": {"price": 200, "quantity_sold": 60}
        },
        "South": {
            "Product A": {"price": 50, "quantity_sold": 120},
            "Product B": {"price": 100, "quantity_sold": 110},
            "Product C": {"price": 200, "quantity_sold": 90}
        },
        "East": {
            "Product A": {"price": 50, "quantity_sold": 90},
            "Product B": {"price": 100, "quantity_sold": 130},
            "Product C": {"price": 200, "quantity_sold": 75}
        },
        "West": {
            "Product A": {"price": 50, "quantity_sold": 110},
            "Product B": {"price": 100, "quantity_sold": 140},
            "Product C": {"price": 200, "quantity_sold": 80}
        }
    };

    let sales_report = create_sales_report(sales_data);
    
    print(JSON.stringify(sales_report, null, 4));
}
```
