from django.contrib import admin
from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static 
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='login'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('logout/',Logout,name='Logging-Out'),
    path('jobapplication/',JobApplicationAPI.as_view(),name='job-application'),
    path('apply/',ApplicationAPI.as_view(),name='applying-for-job'),


    path('getalljobposts/',JobApplicationAPI.GetJobPosts,name='getting-all-posts-of-a-employer'),
    path('getapplicationonpost/<str:id>/',JobApplicationAPI.getApplicationsOnJOBPOST,name='Getting-applications-related-to-jobpost'),
    path('getjobposts/',getAllPosts,name='Getting-all-job-posts'),
    path('allapplied/',ApplicationAPI.getAllAppliedApplications,name='all-applied-applications-of-user'),

    # Searching for Jobs:
    path('jobpost/search/', JobPOSTSearchView.as_view(), name='jobpost-search'),

    # Deleting Applications:
    path('deleteapplicationpost/<str:id>/',deleteApplicationPOST,name='Deleting-application'), 
    path('deletejobapplication/<str:id>/',deleteApplication,name="deleting-job-application")

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()
