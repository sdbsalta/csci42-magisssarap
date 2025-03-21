# from django import forms
# from .models import Restaurant

# class CreateRestaurantForm(forms.ModelForm):
#     opening_time = forms.TimeField(
#         label="Opening Time",
#         widget=forms.TimeInput(
#             attrs={'placeholder': 'Enter Opening Time'}
#         )
#     )

#     closing_time = forms.TimeField(
#         label="Closing Time",
#         widget=forms.TimeInput(
#             attrs={'placeholder': 'Enter Closing Time'}
#         )
#     )

#     cuisine_type = forms.ModelMultipleChoiceField(
#         label="Cuisines Offered",
#         queryset=CuisineType.objects.all(),
#         widget=forms.CheckboxSelectMultiple()
#     )

#     class Meta:
#       model = Restaurant
#       fields = ['opening_time', 'closing_time', 'cuisine_type']