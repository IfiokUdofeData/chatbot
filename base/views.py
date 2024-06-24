from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import NameForm
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from django.contrib.auth import logout, login, authenticate
from django.shortcuts import redirect
from django.urls import reverse



# Load environment variables from .env file
load_dotenv()

# Accessing an environment variable
key = os.getenv('GEMINI_API_KEY')
print(key)

genai.configure(
    api_key=key
    )

# Create the model
# See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(history=[])



# @login_required
def home(request):
    if request.user.is_authenticated:
        return render(request, "base/index.html")
    return redirect("mylogin")


def chatbot(request):
    return render(request, "base/index2.html")


def input(request):
    return render(request, "input.html")

def second(request):
        return render(request, "second.html")

def returnjson(request):
    dictionary = {1: 'one', 2: 'two', 3: 'three'}
    
    if (request.method == "POST"):
        dictionary2 = {1: 'one', 2: 'two', 3: 'three', 4: request.data}
        return JsonResponse(dictionary2, safe=False)
    return JsonResponse(dictionary, safe=False)

def test(request):
      return render(request, "test.html")

def example(request):
      return render(request, "example.html")


@csrf_exempt  # Use this decorator if CSRF validation is not needed (for development purposes)
def json_handler_view(request):
    if request.method == 'POST':
        try:
            # Assuming the POST body contains JSON data
            data = json.loads(request.body)
            # Process the JSON data as needed
            response = chat_session.send_message(data["data"])
            # Example: Print the received data
            print("Received JSON data:", response.text)
            # Example: Return a JSON response
            return JsonResponse({'message': response.text}, status=200)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    


def authView(request):
    # form = UserCreationForm()
    if request.method == "POST":
      form = UserCreationForm(request.POST or None)
      if form.is_valid():
          form.save()
          print("form is valid")

          return redirect("home")
      
    else:
      print("not is valid")
      form = UserCreationForm()
    return render(request, "registration/signup.html", {'form': form})

def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("mylogin")
    return render(request, "registration/logout.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is None:
            context = {"Error": "Invalid username or password"}
            return render(request, "registration/login.html", context)
        login(request, user)
        return redirect("home")
    return render(request, "registration/login.html")

