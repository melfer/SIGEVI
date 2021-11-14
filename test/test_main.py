from django import urls
from django.contrib.auth import get_user_model
import pytest

@pytest.mark.parametrize('param',[('register'),('login'),])
def test_render_views(param,client):
    temp_url=urls.reverse(param)
    resp = client.get(temp_url)
    assert resp.status_code ==200

@pytest.fixture
def user_data():
    return{'first_name':'melfer','last_name':'alvarez','email':'melferalvarez@mail.com','username':'melfer',
    'password1':'L4l09599.','password2':'L4l09599.'}

@pytest.mark.django_db
def test_user_signup(client,user_data):
    user_model = get_user_model()
    assert user_model.objects.count() == 0
    signup_url =urls.reverse('register')
    resp =client.post(signup_url,user_data)
    assert user_model.objects.count() == 1
    assert resp.status_code == 302

@pytest.fixture
def create_test_user():
    user_model = get_user_model()
    test_user = user_model.objects.create_user(first_name='melfer',last_name='alvarez',email='melferalvarez@mail.com',username='melfer',
    password='L4l09599.')
    test_user.set_password('L4l09599.')
    return test_user

@pytest.mark.django_db
def test_user_login(client,create_test_user):
    user_model = get_user_model()
    assert user_model.objects.count() == 1
    login_url = urls.reverse('login')
    resp = client.post(login_url,data = {'username':'melfer','password':'L4l09599.'})
    assert resp.status_code == 302
