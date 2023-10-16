import requests


def add_todo(task, completed):
    # Define the API endpoint URL
    api_url = "http://127.0.0.1:8000/todo"

    # Define the data you want to add as a dictionary
    data = {
        "task": task,
        "completed": completed
    }

    # Send a POST request to the API endpoint
    response = requests.post(api_url, data=data)

    # Check the response status code to determine if the data was added successfully
    print(response.text)
    if response.status_code == 201:
        print("Data added successfully!")
    else:
        print(f"Failed to add data. Status code: {response.status_code}")
        # print(response.text)

# Example usage:
add_todo("Buy groceries", False)
add_todo("Finish work project", False)
add_todo("Call mom", False)
add_todo("Go for a run", True)
add_todo("Read a new book", False)
add_todo("Plan weekend trip", False)
add_todo("Clean the house", True)
add_todo("Attend a meeting", False)
add_todo("Learn a new programming language", False)
add_todo("Watch a new movie", True)
add_todo("Write in your journal", False)

