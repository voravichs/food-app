{
 "cells": [
  {
   "cell_type": "markdown",
   "id": "e53563bb-bd30-4982-bfee-e300bbb6a3c4",
   "metadata": {},
   "source": [
    "# Install and imports"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "id": "d9dee487-ed98-4530-bff4-0543af46ff18",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Requirement already satisfied: pandas in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (2.1.2)\n",
      "Requirement already satisfied: numpy<2,>=1.22.4 in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (from pandas) (1.25.2)\n",
      "Requirement already satisfied: python-dateutil>=2.8.2 in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (from pandas) (2.8.2)\n",
      "Requirement already satisfied: pytz>=2020.1 in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (from pandas) (2023.3.post1)\n",
      "Requirement already satisfied: tzdata>=2022.1 in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (from pandas) (2023.3)\n",
      "Requirement already satisfied: six>=1.5 in /Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/site-packages (from python-dateutil>=2.8.2->pandas) (1.16.0)\n",
      "Note: you may need to restart the kernel to use updated packages.\n"
     ]
    }
   ],
   "source": [
    "pip install pandas"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "id": "392d40d1-c1c6-4aa3-81e0-8b0fddf47905",
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "import pandas as pd\n",
    "import json"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d0740a0b-8010-436f-9c68-a3d60f6868f7",
   "metadata": {},
   "source": [
    "# Business Table"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "0ea1978a-b355-4d7f-8317-5f1e11d6e448",
   "metadata": {},
   "outputs": [],
   "source": [
    "business = pd.read_json('business.json', lines=True)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "id": "629def55-1df3-463d-b844-912bf832fd40",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "RangeIndex: 150346 entries, 0 to 150345\n",
      "Data columns (total 14 columns):\n",
      " #   Column        Non-Null Count   Dtype  \n",
      "---  ------        --------------   -----  \n",
      " 0   business_id   150346 non-null  object \n",
      " 1   name          150346 non-null  object \n",
      " 2   address       150346 non-null  object \n",
      " 3   city          150346 non-null  object \n",
      " 4   state         150346 non-null  object \n",
      " 5   postal_code   150346 non-null  object \n",
      " 6   latitude      150346 non-null  float64\n",
      " 7   longitude     150346 non-null  float64\n",
      " 8   stars         150346 non-null  float64\n",
      " 9   review_count  150346 non-null  int64  \n",
      " 10  is_open       150346 non-null  int64  \n",
      " 11  attributes    136602 non-null  object \n",
      " 12  categories    150243 non-null  object \n",
      " 13  hours         127123 non-null  object \n",
      "dtypes: float64(3), int64(2), object(9)\n",
      "memory usage: 16.1+ MB\n"
     ]
    }
   ],
   "source": [
    "#take a look at business\n",
    "df_business = business\n",
    "df_business.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "id": "8c3e49f2-1286-402a-b988-61124cc98f0f",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>business_id</th>\n",
       "      <th>name</th>\n",
       "      <th>address</th>\n",
       "      <th>city</th>\n",
       "      <th>state</th>\n",
       "      <th>postal_code</th>\n",
       "      <th>latitude</th>\n",
       "      <th>longitude</th>\n",
       "      <th>stars</th>\n",
       "      <th>review_count</th>\n",
       "      <th>is_open</th>\n",
       "      <th>attributes</th>\n",
       "      <th>categories</th>\n",
       "      <th>hours</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Pns2l4eNsfO8kk83dixA6A</td>\n",
       "      <td>Abby Rappoport, LAC, CMQ</td>\n",
       "      <td>1616 Chapala St, Ste 2</td>\n",
       "      <td>Santa Barbara</td>\n",
       "      <td>CA</td>\n",
       "      <td>93101</td>\n",
       "      <td>34.426679</td>\n",
       "      <td>-119.711197</td>\n",
       "      <td>5.0</td>\n",
       "      <td>7</td>\n",
       "      <td>0</td>\n",
       "      <td>{'ByAppointmentOnly': 'True'}</td>\n",
       "      <td>Doctors, Traditional Chinese Medicine, Naturop...</td>\n",
       "      <td>None</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>mpf3x-BjTdTEA3yCZrAYPw</td>\n",
       "      <td>The UPS Store</td>\n",
       "      <td>87 Grasso Plaza Shopping Center</td>\n",
       "      <td>Affton</td>\n",
       "      <td>MO</td>\n",
       "      <td>63123</td>\n",
       "      <td>38.551126</td>\n",
       "      <td>-90.335695</td>\n",
       "      <td>3.0</td>\n",
       "      <td>15</td>\n",
       "      <td>1</td>\n",
       "      <td>{'BusinessAcceptsCreditCards': 'True'}</td>\n",
       "      <td>Shipping Centers, Local Services, Notaries, Ma...</td>\n",
       "      <td>{'Monday': '0:0-0:0', 'Tuesday': '8:0-18:30', ...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>tUFrWirKiKi_TAnsVWINQQ</td>\n",
       "      <td>Target</td>\n",
       "      <td>5255 E Broadway Blvd</td>\n",
       "      <td>Tucson</td>\n",
       "      <td>AZ</td>\n",
       "      <td>85711</td>\n",
       "      <td>32.223236</td>\n",
       "      <td>-110.880452</td>\n",
       "      <td>3.5</td>\n",
       "      <td>22</td>\n",
       "      <td>0</td>\n",
       "      <td>{'BikeParking': 'True', 'BusinessAcceptsCredit...</td>\n",
       "      <td>Department Stores, Shopping, Fashion, Home &amp; G...</td>\n",
       "      <td>{'Monday': '8:0-22:0', 'Tuesday': '8:0-22:0', ...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>MTSW4McQd7CbVtyjqoe9mw</td>\n",
       "      <td>St Honore Pastries</td>\n",
       "      <td>935 Race St</td>\n",
       "      <td>Philadelphia</td>\n",
       "      <td>PA</td>\n",
       "      <td>19107</td>\n",
       "      <td>39.955505</td>\n",
       "      <td>-75.155564</td>\n",
       "      <td>4.0</td>\n",
       "      <td>80</td>\n",
       "      <td>1</td>\n",
       "      <td>{'RestaurantsDelivery': 'False', 'OutdoorSeati...</td>\n",
       "      <td>Restaurants, Food, Bubble Tea, Coffee &amp; Tea, B...</td>\n",
       "      <td>{'Monday': '7:0-20:0', 'Tuesday': '7:0-20:0', ...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>mWMc6_wTdE0EUBKIGXDVfA</td>\n",
       "      <td>Perkiomen Valley Brewery</td>\n",
       "      <td>101 Walnut St</td>\n",
       "      <td>Green Lane</td>\n",
       "      <td>PA</td>\n",
       "      <td>18054</td>\n",
       "      <td>40.338183</td>\n",
       "      <td>-75.471659</td>\n",
       "      <td>4.5</td>\n",
       "      <td>13</td>\n",
       "      <td>1</td>\n",
       "      <td>{'BusinessAcceptsCreditCards': 'True', 'Wheelc...</td>\n",
       "      <td>Brewpubs, Breweries, Food</td>\n",
       "      <td>{'Wednesday': '14:0-22:0', 'Thursday': '16:0-2...</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "              business_id                      name  \\\n",
       "0  Pns2l4eNsfO8kk83dixA6A  Abby Rappoport, LAC, CMQ   \n",
       "1  mpf3x-BjTdTEA3yCZrAYPw             The UPS Store   \n",
       "2  tUFrWirKiKi_TAnsVWINQQ                    Target   \n",
       "3  MTSW4McQd7CbVtyjqoe9mw        St Honore Pastries   \n",
       "4  mWMc6_wTdE0EUBKIGXDVfA  Perkiomen Valley Brewery   \n",
       "\n",
       "                           address           city state postal_code  \\\n",
       "0           1616 Chapala St, Ste 2  Santa Barbara    CA       93101   \n",
       "1  87 Grasso Plaza Shopping Center         Affton    MO       63123   \n",
       "2             5255 E Broadway Blvd         Tucson    AZ       85711   \n",
       "3                      935 Race St   Philadelphia    PA       19107   \n",
       "4                    101 Walnut St     Green Lane    PA       18054   \n",
       "\n",
       "    latitude   longitude  stars  review_count  is_open  \\\n",
       "0  34.426679 -119.711197    5.0             7        0   \n",
       "1  38.551126  -90.335695    3.0            15        1   \n",
       "2  32.223236 -110.880452    3.5            22        0   \n",
       "3  39.955505  -75.155564    4.0            80        1   \n",
       "4  40.338183  -75.471659    4.5            13        1   \n",
       "\n",
       "                                          attributes  \\\n",
       "0                      {'ByAppointmentOnly': 'True'}   \n",
       "1             {'BusinessAcceptsCreditCards': 'True'}   \n",
       "2  {'BikeParking': 'True', 'BusinessAcceptsCredit...   \n",
       "3  {'RestaurantsDelivery': 'False', 'OutdoorSeati...   \n",
       "4  {'BusinessAcceptsCreditCards': 'True', 'Wheelc...   \n",
       "\n",
       "                                          categories  \\\n",
       "0  Doctors, Traditional Chinese Medicine, Naturop...   \n",
       "1  Shipping Centers, Local Services, Notaries, Ma...   \n",
       "2  Department Stores, Shopping, Fashion, Home & G...   \n",
       "3  Restaurants, Food, Bubble Tea, Coffee & Tea, B...   \n",
       "4                          Brewpubs, Breweries, Food   \n",
       "\n",
       "                                               hours  \n",
       "0                                               None  \n",
       "1  {'Monday': '0:0-0:0', 'Tuesday': '8:0-18:30', ...  \n",
       "2  {'Monday': '8:0-22:0', 'Tuesday': '8:0-22:0', ...  \n",
       "3  {'Monday': '7:0-20:0', 'Tuesday': '7:0-20:0', ...  \n",
       "4  {'Wednesday': '14:0-22:0', 'Thursday': '16:0-2...  "
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_business.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "id": "d9815c53-6d80-4c65-8adf-13ef55c5a4be",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "business_id         0\n",
       "name                0\n",
       "address             0\n",
       "city                0\n",
       "state               0\n",
       "postal_code         0\n",
       "latitude            0\n",
       "longitude           0\n",
       "stars               0\n",
       "review_count        0\n",
       "is_open             0\n",
       "attributes      13744\n",
       "categories        103\n",
       "hours           23223\n",
       "dtype: int64"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "## check for null values \n",
    "df_business.isnull().sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "id": "b77a7ca5-55ac-4093-a1af-fef150eb2522",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "business_id     0\n",
       "name            0\n",
       "address         0\n",
       "city            0\n",
       "state           0\n",
       "postal_code     0\n",
       "latitude        0\n",
       "longitude       0\n",
       "stars           0\n",
       "review_count    0\n",
       "is_open         0\n",
       "attributes      0\n",
       "categories      0\n",
       "hours           0\n",
       "dtype: int64"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "## drop rows with null since we filter on these attributes so if its null, the business will just never show up\n",
    "df_business.dropna(subset=['categories', 'attributes', 'hours'], inplace=True)\n",
    "## check that there are no null values \n",
    "df_business.isnull().sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "e95de7af-dce9-46a0-9cab-a6b2d5693e1a",
   "metadata": {},
   "source": [
    "### Categories Column: too many unique categories, thus only dropping business that are not Food related"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "id": "aa79c72e-0fef-496b-96b2-5425d2a913c6",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "1291"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# take a look at all the unique categories in the categories column\n",
    "unique_categories = set(category.strip() for sublist in df_business['categories'].str.split(', ') for category in sublist)\n",
    "len(unique_categories)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 14,
   "id": "eca74daf-8fbc-4553-815c-e644dfbfe470",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "58111"
      ]
     },
     "execution_count": 14,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# since there are too many businesses that are not food related, we will remove those businesses\n",
    "df_business = df_business[df_business['categories'].str.contains('restaurant|food|dessert|bar|cafe', case=False)]\n",
    "len(df_business)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "id": "957719f5-e394-4eb3-b8bc-450b79bf6eeb",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "853"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# even after filtering the category string to keep those that only have the words restaurant, food, dessert, bar or cafe\n",
    "# there are still a lot of categories. Thus we will keep this category list as a string and as one single attribute  \n",
    "unique_categories = set(category.strip() for sublist in df_business['categories'].str.split(', ') for category in sublist)\n",
    "len(unique_categories)"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "3deddd05-a699-42c5-acb7-3abe78bb80ac",
   "metadata": {},
   "source": [
    "### Attributes Column  - too many nulls, thus drop whole column"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 16,
   "id": "a7c1b652-fd5a-454c-88d4-04bfdc01297f",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "3     {'RestaurantsDelivery': 'False', 'OutdoorSeati...\n",
       "4     {'BusinessAcceptsCreditCards': 'True', 'Wheelc...\n",
       "5     {'BusinessParking': 'None', 'BusinessAcceptsCr...\n",
       "9     {'RestaurantsAttire': ''casual'', 'Restaurants...\n",
       "11    {'Alcohol': ''none'', 'OutdoorSeating': 'None'...\n",
       "12    {'RestaurantsReservations': 'False', 'Restaura...\n",
       "14    {'OutdoorSeating': 'False', 'RestaurantsGoodFo...\n",
       "15    {'RestaurantsReservations': 'True', 'Restauran...\n",
       "19    {'NoiseLevel': 'u'quiet'', 'GoodForMeal': '{'d...\n",
       "20    {'OutdoorSeating': 'False', 'Caters': 'True', ...\n",
       "Name: attributes, dtype: object"
      ]
     },
     "execution_count": 16,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#look at attributes object \n",
    "df_business['attributes'].head(10)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 17,
   "id": "95a4dd28-7b86-41e3-97a0-738bb4c2c203",
   "metadata": {},
   "outputs": [],
   "source": [
    "#creat attributes table \n",
    "df_attributes = pd.concat([df_business[['business_id']], df_business['attributes'].apply(pd.Series)], axis=1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "id": "ba150e94-1594-41b4-adf4-40d7af061263",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Index(['business_id', 'RestaurantsDelivery', 'OutdoorSeating',\n",
       "       'BusinessAcceptsCreditCards', 'BusinessParking', 'BikeParking',\n",
       "       'RestaurantsPriceRange2', 'RestaurantsTakeOut', 'ByAppointmentOnly',\n",
       "       'WiFi', 'Alcohol', 'Caters', 'WheelchairAccessible', 'GoodForKids',\n",
       "       'RestaurantsAttire', 'RestaurantsReservations', 'Ambience', 'CoatCheck',\n",
       "       'DogsAllowed', 'RestaurantsTableService', 'RestaurantsGoodForGroups',\n",
       "       'HasTV', 'HappyHour', 'DriveThru', 'GoodForMeal', 'NoiseLevel',\n",
       "       'BusinessAcceptsBitcoin', 'Smoking', 'Music', 'GoodForDancing',\n",
       "       'BestNights', 'BYOB', 'Corkage', 'BYOBCorkage', 'HairSpecializesIn',\n",
       "       'AcceptsInsurance', 'RestaurantsCounterService', 'Open24Hours',\n",
       "       'AgesAllowed', 'DietaryRestrictions'],\n",
       "      dtype='object')"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_attributes.columns"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 19,
   "id": "4bb7c808-5932-4da3-9afd-ddc302e3a910",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "business_id                       0\n",
       "RestaurantsDelivery           10457\n",
       "OutdoorSeating                16029\n",
       "BusinessAcceptsCreditCards     6258\n",
       "BusinessParking                5940\n",
       "BikeParking                   15215\n",
       "RestaurantsPriceRange2         8419\n",
       "RestaurantsTakeOut             7180\n",
       "ByAppointmentOnly             51506\n",
       "WiFi                          18638\n",
       "Alcohol                       20675\n",
       "Caters                        21387\n",
       "WheelchairAccessible          40782\n",
       "GoodForKids                   20676\n",
       "RestaurantsAttire             24284\n",
       "RestaurantsReservations       18668\n",
       "Ambience                      19443\n",
       "CoatCheck                     53062\n",
       "DogsAllowed                   44760\n",
       "RestaurantsTableService       39120\n",
       "RestaurantsGoodForGroups      20433\n",
       "HasTV                         18776\n",
       "HappyHour                     44129\n",
       "DriveThru                     50719\n",
       "GoodForMeal                   30932\n",
       "NoiseLevel                    24972\n",
       "BusinessAcceptsBitcoin        49840\n",
       "Smoking                       53983\n",
       "Music                         51404\n",
       "GoodForDancing                53856\n",
       "BestNights                    52841\n",
       "BYOB                          53748\n",
       "Corkage                       54685\n",
       "BYOBCorkage                   56861\n",
       "HairSpecializesIn             57887\n",
       "AcceptsInsurance              58013\n",
       "RestaurantsCounterService     58093\n",
       "Open24Hours                   58085\n",
       "AgesAllowed                   57990\n",
       "DietaryRestrictions           58080\n",
       "dtype: int64"
      ]
     },
     "execution_count": 19,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_attributes.isnull().sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "id": "dba432c0-da20-48b9-9ec9-dd591a69330a",
   "metadata": {},
   "outputs": [],
   "source": [
    "# ## remove unnecessary attributes \n",
    "# df_attributes = df_attributes.drop(columns=['ByAppointmentOnly', 'BikeParking', 'RestaurantsPriceRange2', 'Caters', 'WiFi', \\\n",
    "#                                             'HasTV', 'DogsAllowed', 'Alcohol', 'CoatCheck', 'RestaurantsAttire', 'Ambience', \\\n",
    "#                                            'RestaurantsTableService', 'NoiseLevel', 'GoodForMeal', 'BusinessAcceptsBitcoin', \\\n",
    "#                                            'Smoking', 'Music', 'GoodForDancing', 'BestNights', 'HairSpecializesIn', 'AcceptsInsurance', \\\n",
    "#                                            'RestaurantsCounterService', 'AgesAllowed', 'DietaryRestrictions', 'BYOBCorkage', 'Corkage', \\\n",
    "#                                            'GoodForKids', 'WheelchairAccessible', 'RestaurantsGoodForGroups', 'HappyHour'])"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "94427a67-88cc-4acf-8c7d-153fa1b6746e",
   "metadata": {},
   "outputs": [],
   "source": [
    "# df_attributes = df_attributes.rename(columns={\"BusinessAcceptsCreditCards\": \"Accepts Credit Card\",\\\n",
    "#                         \"RestaurantsTakeOut\": \"Take Out\", \\\n",
    "#                         \"RestaurantsDelivery\": \"Delivery\",\\\n",
    "#                         \"BusinessParking\": \"Parking\",\\\n",
    "#                         \"OutdoorSeating\": \"Outdoor Seating\",\\\n",
    "#                         \"RestaurantsReservations\": \"Takes Reservations\",\\\n",
    "#                         \"DriveThru\": \"Drive Thru\",\\\n",
    "#                         \"Open24Hours\": \"Open 24 Hours\"    \n",
    "#                         })\n",
    "# df_attributes.info()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "c3c09762-276c-4b6c-bb0e-f712c0556598",
   "metadata": {},
   "source": [
    "### Create Geolocation Table"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 22,
   "id": "68c5efb6-98a7-4c7c-b470-6f161d8b4a21",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>business_id</th>\n",
       "      <th>address</th>\n",
       "      <th>city</th>\n",
       "      <th>state</th>\n",
       "      <th>postal_code</th>\n",
       "      <th>latitude</th>\n",
       "      <th>longitude</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>MTSW4McQd7CbVtyjqoe9mw</td>\n",
       "      <td>935 Race St</td>\n",
       "      <td>Philadelphia</td>\n",
       "      <td>PA</td>\n",
       "      <td>19107</td>\n",
       "      <td>39.955505</td>\n",
       "      <td>-75.155564</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>mWMc6_wTdE0EUBKIGXDVfA</td>\n",
       "      <td>101 Walnut St</td>\n",
       "      <td>Green Lane</td>\n",
       "      <td>PA</td>\n",
       "      <td>18054</td>\n",
       "      <td>40.338183</td>\n",
       "      <td>-75.471659</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>CF33F8-E6oudUQ46HnavjQ</td>\n",
       "      <td>615 S Main St</td>\n",
       "      <td>Ashland City</td>\n",
       "      <td>TN</td>\n",
       "      <td>37015</td>\n",
       "      <td>36.269593</td>\n",
       "      <td>-87.058943</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>9</th>\n",
       "      <td>bBDDEgkFA1Otx9Lfe7BZUQ</td>\n",
       "      <td>2312 Dickerson Pike</td>\n",
       "      <td>Nashville</td>\n",
       "      <td>TN</td>\n",
       "      <td>37207</td>\n",
       "      <td>36.208102</td>\n",
       "      <td>-86.768170</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>11</th>\n",
       "      <td>eEOYSgkmpB90uNA7lDOMRA</td>\n",
       "      <td></td>\n",
       "      <td>Tampa Bay</td>\n",
       "      <td>FL</td>\n",
       "      <td>33602</td>\n",
       "      <td>27.955269</td>\n",
       "      <td>-82.456320</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               business_id              address          city state  \\\n",
       "3   MTSW4McQd7CbVtyjqoe9mw          935 Race St  Philadelphia    PA   \n",
       "4   mWMc6_wTdE0EUBKIGXDVfA        101 Walnut St    Green Lane    PA   \n",
       "5   CF33F8-E6oudUQ46HnavjQ        615 S Main St  Ashland City    TN   \n",
       "9   bBDDEgkFA1Otx9Lfe7BZUQ  2312 Dickerson Pike     Nashville    TN   \n",
       "11  eEOYSgkmpB90uNA7lDOMRA                          Tampa Bay    FL   \n",
       "\n",
       "   postal_code   latitude  longitude  \n",
       "3        19107  39.955505 -75.155564  \n",
       "4        18054  40.338183 -75.471659  \n",
       "5        37015  36.269593 -87.058943  \n",
       "9        37207  36.208102 -86.768170  \n",
       "11       33602  27.955269 -82.456320  "
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#Create geographical location table\n",
    "df_geo = df_business[['business_id', 'address', 'city', 'state', 'postal_code', 'latitude', 'longitude']]\n",
    "df_geo.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "ab03c95e-c32a-43bc-883b-2004089158c4",
   "metadata": {},
   "source": [
    "### Final clean up of Business Table"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 23,
   "id": "123a3a94-f32b-4d86-b3d7-b0c06bc780be",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "Index: 58111 entries, 3 to 150340\n",
      "Data columns (total 6 columns):\n",
      " #   Column        Non-Null Count  Dtype  \n",
      "---  ------        --------------  -----  \n",
      " 0   business_id   58111 non-null  object \n",
      " 1   name          58111 non-null  object \n",
      " 2   stars         58111 non-null  float64\n",
      " 3   review_count  58111 non-null  int64  \n",
      " 4   is_open       58111 non-null  int64  \n",
      " 5   categories    58111 non-null  object \n",
      "dtypes: float64(1), int64(2), object(3)\n",
      "memory usage: 3.1+ MB\n"
     ]
    }
   ],
   "source": [
    "# drop attributes, hours + geolocation related columns \n",
    "df_business = df_business.drop(columns=['attributes', 'hours', 'address', 'city', 'state', 'postal_code', 'latitude', 'longitude'])\n",
    "# check that columns are dropped \n",
    "df_business.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "id": "00bd5792-5707-4223-a63b-8bdf0fd2bf49",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "Index: 58111 entries, 3 to 150340\n",
      "Data columns (total 6 columns):\n",
      " #   Column        Non-Null Count  Dtype  \n",
      "---  ------        --------------  -----  \n",
      " 0   business_id   58111 non-null  object \n",
      " 1   name          58111 non-null  object \n",
      " 2   stars         58111 non-null  float64\n",
      " 3   review_count  58111 non-null  int64  \n",
      " 4   is_open       58111 non-null  int64  \n",
      " 5   categories    58111 non-null  object \n",
      "dtypes: float64(1), int64(2), object(3)\n",
      "memory usage: 3.1+ MB\n"
     ]
    }
   ],
   "source": [
    "df_business.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 25,
   "id": "98f11e91-b456-4fbe-8666-bf5751c814e9",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>business_id</th>\n",
       "      <th>name</th>\n",
       "      <th>stars</th>\n",
       "      <th>review_count</th>\n",
       "      <th>is_open</th>\n",
       "      <th>categories</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>MTSW4McQd7CbVtyjqoe9mw</td>\n",
       "      <td>St Honore Pastries</td>\n",
       "      <td>4.0</td>\n",
       "      <td>80</td>\n",
       "      <td>1</td>\n",
       "      <td>Restaurants, Food, Bubble Tea, Coffee &amp; Tea, B...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>mWMc6_wTdE0EUBKIGXDVfA</td>\n",
       "      <td>Perkiomen Valley Brewery</td>\n",
       "      <td>4.5</td>\n",
       "      <td>13</td>\n",
       "      <td>1</td>\n",
       "      <td>Brewpubs, Breweries, Food</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>CF33F8-E6oudUQ46HnavjQ</td>\n",
       "      <td>Sonic Drive-In</td>\n",
       "      <td>2.0</td>\n",
       "      <td>6</td>\n",
       "      <td>1</td>\n",
       "      <td>Burgers, Fast Food, Sandwiches, Food, Ice Crea...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>9</th>\n",
       "      <td>bBDDEgkFA1Otx9Lfe7BZUQ</td>\n",
       "      <td>Sonic Drive-In</td>\n",
       "      <td>1.5</td>\n",
       "      <td>10</td>\n",
       "      <td>1</td>\n",
       "      <td>Ice Cream &amp; Frozen Yogurt, Fast Food, Burgers,...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>11</th>\n",
       "      <td>eEOYSgkmpB90uNA7lDOMRA</td>\n",
       "      <td>Vietnamese Food Truck</td>\n",
       "      <td>4.0</td>\n",
       "      <td>10</td>\n",
       "      <td>1</td>\n",
       "      <td>Vietnamese, Food, Restaurants, Food Trucks</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               business_id                      name  stars  review_count  \\\n",
       "3   MTSW4McQd7CbVtyjqoe9mw        St Honore Pastries    4.0            80   \n",
       "4   mWMc6_wTdE0EUBKIGXDVfA  Perkiomen Valley Brewery    4.5            13   \n",
       "5   CF33F8-E6oudUQ46HnavjQ            Sonic Drive-In    2.0             6   \n",
       "9   bBDDEgkFA1Otx9Lfe7BZUQ            Sonic Drive-In    1.5            10   \n",
       "11  eEOYSgkmpB90uNA7lDOMRA     Vietnamese Food Truck    4.0            10   \n",
       "\n",
       "    is_open                                         categories  \n",
       "3         1  Restaurants, Food, Bubble Tea, Coffee & Tea, B...  \n",
       "4         1                          Brewpubs, Breweries, Food  \n",
       "5         1  Burgers, Fast Food, Sandwiches, Food, Ice Crea...  \n",
       "9         1  Ice Cream & Frozen Yogurt, Fast Food, Burgers,...  \n",
       "11        1         Vietnamese, Food, Restaurants, Food Trucks  "
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_business.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 26,
   "id": "8822ff83-82da-4ca9-80c9-d14ec4842cff",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "business_id     0\n",
       "name            0\n",
       "stars           0\n",
       "review_count    0\n",
       "is_open         0\n",
       "categories      0\n",
       "dtype: int64"
      ]
     },
     "execution_count": 26,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_business.isnull().sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "3ef2131b-2e59-48f5-86a4-26701573e8b6",
   "metadata": {},
   "source": [
    "# User Table "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "id": "ee62cc0c-2bc9-4c5e-becc-34587a408b83",
   "metadata": {},
   "outputs": [],
   "source": [
    "user = pd.read_json('user.json', lines=True)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "id": "87a9978e-8724-4cae-982b-14b2b9562c94",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "RangeIndex: 1987897 entries, 0 to 1987896\n",
      "Data columns (total 22 columns):\n",
      " #   Column              Dtype  \n",
      "---  ------              -----  \n",
      " 0   user_id             object \n",
      " 1   name                object \n",
      " 2   review_count        int64  \n",
      " 3   yelping_since       object \n",
      " 4   useful              int64  \n",
      " 5   funny               int64  \n",
      " 6   cool                int64  \n",
      " 7   elite               object \n",
      " 8   friends             object \n",
      " 9   fans                int64  \n",
      " 10  average_stars       float64\n",
      " 11  compliment_hot      int64  \n",
      " 12  compliment_more     int64  \n",
      " 13  compliment_profile  int64  \n",
      " 14  compliment_cute     int64  \n",
      " 15  compliment_list     int64  \n",
      " 16  compliment_note     int64  \n",
      " 17  compliment_plain    int64  \n",
      " 18  compliment_cool     int64  \n",
      " 19  compliment_funny    int64  \n",
      " 20  compliment_writer   int64  \n",
      " 21  compliment_photos   int64  \n",
      "dtypes: float64(1), int64(16), object(5)\n",
      "memory usage: 333.7+ MB\n"
     ]
    }
   ],
   "source": [
    "## Preview user table \n",
    "df_user = user\n",
    "df_user.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "id": "aaf32e7b-4235-49a8-b46e-56fc2d1107a7",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>user_id</th>\n",
       "      <th>name</th>\n",
       "      <th>review_count</th>\n",
       "      <th>yelping_since</th>\n",
       "      <th>useful</th>\n",
       "      <th>funny</th>\n",
       "      <th>cool</th>\n",
       "      <th>elite</th>\n",
       "      <th>friends</th>\n",
       "      <th>fans</th>\n",
       "      <th>...</th>\n",
       "      <th>compliment_more</th>\n",
       "      <th>compliment_profile</th>\n",
       "      <th>compliment_cute</th>\n",
       "      <th>compliment_list</th>\n",
       "      <th>compliment_note</th>\n",
       "      <th>compliment_plain</th>\n",
       "      <th>compliment_cool</th>\n",
       "      <th>compliment_funny</th>\n",
       "      <th>compliment_writer</th>\n",
       "      <th>compliment_photos</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>qVc8ODYU5SZjKXVBgXdI7w</td>\n",
       "      <td>Walker</td>\n",
       "      <td>585</td>\n",
       "      <td>2007-01-25 16:47:26</td>\n",
       "      <td>7217</td>\n",
       "      <td>1259</td>\n",
       "      <td>5994</td>\n",
       "      <td>2007</td>\n",
       "      <td>NSCy54eWehBJyZdG2iE84w, pe42u7DcCH2QmI81NX-8qA...</td>\n",
       "      <td>267</td>\n",
       "      <td>...</td>\n",
       "      <td>65</td>\n",
       "      <td>55</td>\n",
       "      <td>56</td>\n",
       "      <td>18</td>\n",
       "      <td>232</td>\n",
       "      <td>844</td>\n",
       "      <td>467</td>\n",
       "      <td>467</td>\n",
       "      <td>239</td>\n",
       "      <td>180</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>j14WgRoU_-2ZE1aw1dXrJg</td>\n",
       "      <td>Daniel</td>\n",
       "      <td>4333</td>\n",
       "      <td>2009-01-25 04:35:42</td>\n",
       "      <td>43091</td>\n",
       "      <td>13066</td>\n",
       "      <td>27281</td>\n",
       "      <td>2009,2010,2011,2012,2013,2014,2015,2016,2017,2...</td>\n",
       "      <td>ueRPE0CX75ePGMqOFVj6IQ, 52oH4DrRvzzl8wh5UXyU0A...</td>\n",
       "      <td>3138</td>\n",
       "      <td>...</td>\n",
       "      <td>264</td>\n",
       "      <td>184</td>\n",
       "      <td>157</td>\n",
       "      <td>251</td>\n",
       "      <td>1847</td>\n",
       "      <td>7054</td>\n",
       "      <td>3131</td>\n",
       "      <td>3131</td>\n",
       "      <td>1521</td>\n",
       "      <td>1946</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>2WnXYQFK0hXEoTxPtV2zvg</td>\n",
       "      <td>Steph</td>\n",
       "      <td>665</td>\n",
       "      <td>2008-07-25 10:41:00</td>\n",
       "      <td>2086</td>\n",
       "      <td>1010</td>\n",
       "      <td>1003</td>\n",
       "      <td>2009,2010,2011,2012,2013</td>\n",
       "      <td>LuO3Bn4f3rlhyHIaNfTlnA, j9B4XdHUhDfTKVecyWQgyA...</td>\n",
       "      <td>52</td>\n",
       "      <td>...</td>\n",
       "      <td>13</td>\n",
       "      <td>10</td>\n",
       "      <td>17</td>\n",
       "      <td>3</td>\n",
       "      <td>66</td>\n",
       "      <td>96</td>\n",
       "      <td>119</td>\n",
       "      <td>119</td>\n",
       "      <td>35</td>\n",
       "      <td>18</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>SZDeASXq7o05mMNLshsdIA</td>\n",
       "      <td>Gwen</td>\n",
       "      <td>224</td>\n",
       "      <td>2005-11-29 04:38:33</td>\n",
       "      <td>512</td>\n",
       "      <td>330</td>\n",
       "      <td>299</td>\n",
       "      <td>2009,2010,2011</td>\n",
       "      <td>enx1vVPnfdNUdPho6PH_wg, 4wOcvMLtU6a9Lslggq74Vg...</td>\n",
       "      <td>28</td>\n",
       "      <td>...</td>\n",
       "      <td>4</td>\n",
       "      <td>1</td>\n",
       "      <td>6</td>\n",
       "      <td>2</td>\n",
       "      <td>12</td>\n",
       "      <td>16</td>\n",
       "      <td>26</td>\n",
       "      <td>26</td>\n",
       "      <td>10</td>\n",
       "      <td>9</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>hA5lMy-EnncsH4JoR-hFGQ</td>\n",
       "      <td>Karen</td>\n",
       "      <td>79</td>\n",
       "      <td>2007-01-05 19:40:59</td>\n",
       "      <td>29</td>\n",
       "      <td>15</td>\n",
       "      <td>7</td>\n",
       "      <td></td>\n",
       "      <td>PBK4q9KEEBHhFvSXCUirIw, 3FWPpM7KU1gXeOM_ZbYMbA...</td>\n",
       "      <td>1</td>\n",
       "      <td>...</td>\n",
       "      <td>1</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>1</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>5 rows × 22 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "                  user_id    name  review_count        yelping_since  useful  \\\n",
       "0  qVc8ODYU5SZjKXVBgXdI7w  Walker           585  2007-01-25 16:47:26    7217   \n",
       "1  j14WgRoU_-2ZE1aw1dXrJg  Daniel          4333  2009-01-25 04:35:42   43091   \n",
       "2  2WnXYQFK0hXEoTxPtV2zvg   Steph           665  2008-07-25 10:41:00    2086   \n",
       "3  SZDeASXq7o05mMNLshsdIA    Gwen           224  2005-11-29 04:38:33     512   \n",
       "4  hA5lMy-EnncsH4JoR-hFGQ   Karen            79  2007-01-05 19:40:59      29   \n",
       "\n",
       "   funny   cool                                              elite  \\\n",
       "0   1259   5994                                               2007   \n",
       "1  13066  27281  2009,2010,2011,2012,2013,2014,2015,2016,2017,2...   \n",
       "2   1010   1003                           2009,2010,2011,2012,2013   \n",
       "3    330    299                                     2009,2010,2011   \n",
       "4     15      7                                                      \n",
       "\n",
       "                                             friends  fans  ...  \\\n",
       "0  NSCy54eWehBJyZdG2iE84w, pe42u7DcCH2QmI81NX-8qA...   267  ...   \n",
       "1  ueRPE0CX75ePGMqOFVj6IQ, 52oH4DrRvzzl8wh5UXyU0A...  3138  ...   \n",
       "2  LuO3Bn4f3rlhyHIaNfTlnA, j9B4XdHUhDfTKVecyWQgyA...    52  ...   \n",
       "3  enx1vVPnfdNUdPho6PH_wg, 4wOcvMLtU6a9Lslggq74Vg...    28  ...   \n",
       "4  PBK4q9KEEBHhFvSXCUirIw, 3FWPpM7KU1gXeOM_ZbYMbA...     1  ...   \n",
       "\n",
       "   compliment_more  compliment_profile  compliment_cute  compliment_list  \\\n",
       "0               65                  55               56               18   \n",
       "1              264                 184              157              251   \n",
       "2               13                  10               17                3   \n",
       "3                4                   1                6                2   \n",
       "4                1                   0                0                0   \n",
       "\n",
       "   compliment_note  compliment_plain  compliment_cool  compliment_funny  \\\n",
       "0              232               844              467               467   \n",
       "1             1847              7054             3131              3131   \n",
       "2               66                96              119               119   \n",
       "3               12                16               26                26   \n",
       "4                1                 1                0                 0   \n",
       "\n",
       "   compliment_writer  compliment_photos  \n",
       "0                239                180  \n",
       "1               1521               1946  \n",
       "2                 35                 18  \n",
       "3                 10                  9  \n",
       "4                  0                  0  \n",
       "\n",
       "[5 rows x 22 columns]"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_user.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "id": "9525fe14-5b4a-48bb-a707-2dbdec1acdee",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "RangeIndex: 1987897 entries, 0 to 1987896\n",
      "Data columns (total 6 columns):\n",
      " #   Column         Dtype  \n",
      "---  ------         -----  \n",
      " 0   user_id        object \n",
      " 1   name           object \n",
      " 2   review_count   int64  \n",
      " 3   yelping_since  object \n",
      " 4   useful         int64  \n",
      " 5   average_stars  float64\n",
      "dtypes: float64(1), int64(2), object(3)\n",
      "memory usage: 91.0+ MB\n"
     ]
    }
   ],
   "source": [
    "# drop elite and compliment related columns since we won't be using these in our application\n",
    "df_user = df_user.drop(columns=['funny', 'cool','friends', 'fans', 'elite', 'compliment_more', 'compliment_profile', 'compliment_cute', 'compliment_list', 'compliment_note', 'compliment_hot', 'compliment_plain', 'compliment_cool', 'compliment_funny', 'compliment_writer', 'compliment_photos'])\n",
    "# check that columns are dropped \n",
    "df_user.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "id": "05084cbe-5670-4283-8ccf-707c13af5a4d",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "user_id          0\n",
       "name             0\n",
       "review_count     0\n",
       "yelping_since    0\n",
       "useful           0\n",
       "average_stars    0\n",
       "dtype: int64"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "## check for null values \n",
    "df_user.isnull().sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "8c24dca0-ce20-4545-abad-fc35f032d92b",
   "metadata": {},
   "source": [
    "# Reviews Table"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "id": "fb81a2be-3c83-4709-97bb-6927a6980c9d",
   "metadata": {},
   "outputs": [],
   "source": [
    "review = pd.read_json('review.json', lines=True)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "id": "b72f04b2-c2be-4db9-8336-ffed1265a8f4",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "<class 'pandas.core.frame.DataFrame'>\n",
      "RangeIndex: 6990280 entries, 0 to 6990279\n",
      "Data columns (total 9 columns):\n",
      " #   Column       Dtype         \n",
      "---  ------       -----         \n",
      " 0   review_id    object        \n",
      " 1   user_id      object        \n",
      " 2   business_id  object        \n",
      " 3   stars        int64         \n",
      " 4   useful       int64         \n",
      " 5   funny        int64         \n",
      " 6   cool         int64         \n",
      " 7   text         object        \n",
      " 8   date         datetime64[ns]\n",
      "dtypes: datetime64[ns](1), int64(4), object(4)\n",
      "memory usage: 480.0+ MB\n"
     ]
    }
   ],
   "source": [
    "## Preview reviews table \n",
    "df_review = review\n",
    "df_review.info()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 25,
   "id": "54d0b2c9-4159-408f-a265-1e91f3fe3c14",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>review_id</th>\n",
       "      <th>user_id</th>\n",
       "      <th>business_id</th>\n",
       "      <th>stars</th>\n",
       "      <th>useful</th>\n",
       "      <th>funny</th>\n",
       "      <th>cool</th>\n",
       "      <th>text</th>\n",
       "      <th>date</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>KU_O5udG6zpxOg-VcAEodg</td>\n",
       "      <td>mh_-eMZ6K5RLWhZyISBhwA</td>\n",
       "      <td>XQfwVwDr-v0ZS3_CbbE5Xw</td>\n",
       "      <td>3</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>If you decide to eat here, just be aware it is...</td>\n",
       "      <td>2018-07-07 22:09:11</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>BiTunyQ73aT9WBnpR9DZGw</td>\n",
       "      <td>OyoGAe7OKpv6SyGZT5g77Q</td>\n",
       "      <td>7ATYjTIgM3jUlt4UM3IypQ</td>\n",
       "      <td>5</td>\n",
       "      <td>1</td>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>I've taken a lot of spin classes over the year...</td>\n",
       "      <td>2012-01-03 15:28:18</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>saUsX_uimxRlCVr67Z4Jig</td>\n",
       "      <td>8g_iMtfSiwikVnbP2etR0A</td>\n",
       "      <td>YjUWPpI6HXG530lwP-fb2A</td>\n",
       "      <td>3</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>0</td>\n",
       "      <td>Family diner. Had the buffet. Eclectic assortm...</td>\n",
       "      <td>2014-02-05 20:30:30</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>AqPFMleE6RsU23_auESxiA</td>\n",
       "      <td>_7bHUi9Uuf5__HHc_Q8guQ</td>\n",
       "      <td>kxX2SOes4o-D3ZQBkiMRfA</td>\n",
       "      <td>5</td>\n",
       "      <td>1</td>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>Wow!  Yummy, different,  delicious.   Our favo...</td>\n",
       "      <td>2015-01-04 00:01:03</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>Sx8TMOWLNuJBWer-0pcmoA</td>\n",
       "      <td>bcjbaE6dDog4jkNY91ncLQ</td>\n",
       "      <td>e4Vwtrqf-wpJfwesgvdgxQ</td>\n",
       "      <td>4</td>\n",
       "      <td>1</td>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>Cute interior and owner (?) gave us tour of up...</td>\n",
       "      <td>2017-01-14 20:54:15</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                review_id                 user_id             business_id  \\\n",
       "0  KU_O5udG6zpxOg-VcAEodg  mh_-eMZ6K5RLWhZyISBhwA  XQfwVwDr-v0ZS3_CbbE5Xw   \n",
       "1  BiTunyQ73aT9WBnpR9DZGw  OyoGAe7OKpv6SyGZT5g77Q  7ATYjTIgM3jUlt4UM3IypQ   \n",
       "2  saUsX_uimxRlCVr67Z4Jig  8g_iMtfSiwikVnbP2etR0A  YjUWPpI6HXG530lwP-fb2A   \n",
       "3  AqPFMleE6RsU23_auESxiA  _7bHUi9Uuf5__HHc_Q8guQ  kxX2SOes4o-D3ZQBkiMRfA   \n",
       "4  Sx8TMOWLNuJBWer-0pcmoA  bcjbaE6dDog4jkNY91ncLQ  e4Vwtrqf-wpJfwesgvdgxQ   \n",
       "\n",
       "   stars  useful  funny  cool  \\\n",
       "0      3       0      0     0   \n",
       "1      5       1      0     1   \n",
       "2      3       0      0     0   \n",
       "3      5       1      0     1   \n",
       "4      4       1      0     1   \n",
       "\n",
       "                                                text                date  \n",
       "0  If you decide to eat here, just be aware it is... 2018-07-07 22:09:11  \n",
       "1  I've taken a lot of spin classes over the year... 2012-01-03 15:28:18  \n",
       "2  Family diner. Had the buffet. Eclectic assortm... 2014-02-05 20:30:30  \n",
       "3  Wow!  Yummy, different,  delicious.   Our favo... 2015-01-04 00:01:03  \n",
       "4  Cute interior and owner (?) gave us tour of up... 2017-01-14 20:54:15  "
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df_review.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 31,
   "id": "0af5e333-9423-4d73-879a-09cb6dcf22d9",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "review_id      0\n",
       "user_id        0\n",
       "business_id    0\n",
       "stars          0\n",
       "useful         0\n",
       "text           0\n",
       "date           0\n",
       "dtype: int64"
      ]
     },
     "execution_count": 31,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "## check for nulls \n",
    "df_review.isnull().sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "4bd36aa0-d9dd-4e36-9d7e-d16d5343cb06",
   "metadata": {},
   "outputs": [],
   "source": [
    "## drop reviews of the businesses that were dropped (non-food related businesses)\" \n",
    "business_ids = df_business['business_id']\n",
    "df_review_filtered = df_review[df_review['business_id'].isin(business_ids)]\n",
    "df_review = df_review_filtered\n",
    "df.review.info()"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "aabc5b57-1230-4bf6-a6a6-ef63b485a589",
   "metadata": {},
   "source": [
    "# Convert to CSV"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 27,
   "id": "c3987e32-b2bf-4987-8403-7c99d0ba9920",
   "metadata": {},
   "outputs": [],
   "source": [
    "# convert business table \n",
    "df_business.to_csv(\"business.csv\", index=False)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "4f371ae9-ac16-4506-bf74-74180ed4c336",
   "metadata": {},
   "outputs": [],
   "source": [
    "# convert business table \n",
    "df_user.to_csv(\"user.csv\", index=False)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 33,
   "id": "cdef40ce-5869-4ca4-a4f9-53dd00f7bde3",
   "metadata": {},
   "outputs": [],
   "source": [
    "# convert business table \n",
    "df_review.to_csv(\"reviews.csv\", index=False)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 28,
   "id": "d9725186-74bd-4e3a-9082-eda20795fe77",
   "metadata": {},
   "outputs": [],
   "source": [
    "# convert geo location table\n",
    "df_geo.to_csv(\"geolocation.csv\", index=False)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.10.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
