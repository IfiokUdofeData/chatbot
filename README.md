# Portfolio

Welcome to my GitHub portfolio! This repository showcases various projects I have worked on, focusing on web development, data analysis, and AI models.

## Table of Contents

- [Introduction](#introduction)
- [Projects](#projects)
  - [Project 1: Django Landing Page and Chatbot](#project-1-django-landing-page-and-chatbot)
  - [Project 2: International Trade Analysis](#project-2-international-trade-analysis)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This portfolio contains a collection of projects that demonstrate my skills and expertise in various fields. Each project includes comprehensive instructions for setting up, configuring, and using the project.

## Projects

### Project 1: Django Landing Page and Chatbot

A Django-based web application designed as a landing page and chatbot for an immigration company.

#### Prerequisites

- Python 3.8 or higher
- Virtualenv (optional but recommended)
- Gemini API key
- Create a `.env` file and store your keys in the base folder

#### Installation

1. Install Django, Gemini, and python-dotenv:
    ```sh
    pip install django gemini python-dotenv
    ```

2. Create a Virtual Environment:
    ```sh
    python -m venv venv
    ```

3. Activate the Virtual Environment:
    ```sh
    .\venv\Scripts\activate
    ```

4. Change directory to the project file and run the server:
    ```sh
    cd project_directory
    python manage.py runserver
    ```

### Project 2: International Trade Analysis

A data analysis project focusing on imports and exports between Russia and China from 2010-2021, utilizing data from UN COMTRADE. This project involves creating charts, tables, and indices such as RCA and IIT, and applying the Gravity model for trade analysis.

#### Prerequisites

- Python 3.8 or higher
- Pandas, NumPy, Matplotlib, and other relevant libraries

#### Installation

1. Install the required libraries:
    ```sh
    pip install pandas numpy matplotlib
    ```

2. Run the analysis scripts:
    ```sh
    python analysis_script.py
    ```

## Usage

To use any of the projects, follow the installation instructions and run the provided scripts. Detailed usage instructions are provided within each project's directory.

## Testing

For each project, you can create a virtual environment and run the program as follows:

1. Create a Virtual Environment:
    ```sh
    python -m venv venv
    ```

2. Activate the Virtual Environment:
    ```sh
    .\venv\Scripts\activate
    ```

3. Run the project:
    ```sh
    python manage.py runserver
    ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
