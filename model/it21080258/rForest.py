import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import pickle

data = pd.read_csv("Cleaned_data.csv")

X = data.drop(columns=['Date','Variety','Yield'])
Y = data['Yield']

X.head()

Y.head()

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

rf_model = RandomForestRegressor(n_estimators=75, random_state=42)
rf_model.fit(X_train, Y_train)

Y_pred = rf_model.predict(X_test)
mae = mean_absolute_error(Y_test, Y_pred)
mse = mean_squared_error(Y_test, Y_pred)
r2 = r2_score(Y_test, Y_pred)

print("Mean Absolute Error:", mae)
print("Mean Squared Error:", mse)
print("R-squared:", r2)

with open('trained_model_random_forest.pkl', 'wb') as file:
    pickle.dump(rf_model, file)

with open('trained_model_linear.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

example_input = X_test.iloc[0] 
predicted_yield = loaded_model.predict([example_input])
print("Predicted Yield:", predicted_yield)

