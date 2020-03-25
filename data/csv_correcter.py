import pandas as pd
import numpy as np


def import_data(colms):
    # path = '...'
    data = pd.read_csv('./listings.csv')
    data = data[colms]
    print(data.head())
    for col in colms:
        data = data[data[col] != 0]
        # if (col != 'id' and col != 'cleaning_fee' and col != 'price'):
        if (col == 'minimum_nights'):
            data = data[data[col] < 100]
        data = data[data[col].notnull()]

    # for q2_5:
    # data['price'] = data['price'].str.replace(r"[\"\',]", '')

    return data


if __name__ == "__main__":
        # Q2_1:
    data_q2_1 = import_data(
        ['host_response_rate', 'review_scores_rating', 'id', 'neighbourhood_cleansed'])
    data_q2_1.to_csv('q2_1_c.csv', index=False)

    # Q2_2:
    # data_q2_2 = import_data(
    #     ['minimum_nights', 'review_scores_rating', 'id', 'neighbourhood_cleansed'])
    # data_q2_2.to_csv('q2_2_c.csv', index=False)

    # Q2_3:
    # data_q2_3 = import_data(
    #     ['reviews_per_month', 'review_scores_rating', 'id'])
    # data_q2_3.to_csv('q2_3.csv', index=False)

    # Q2_4:
    # data_q2_4 = import_data(
    #     ['cleaning_fee', 'review_scores_cleanliness', 'id'])
    # data_q2_4.to_csv('q2_4.csv', index=False)

    # Q2_5:
    # data_q2_5 = import_data(
    #     ['price', 'guests_included', 'review_scores_rating', 'id'])
    # data_q2_5.to_csv('q2_5.csv', index=False)

    # Q2_6:
    # data_q2_6 = import_data(
    #     ['host_is_superhost', 'review_scores_rating', 'id'])
    # data_q2_6.to_csv('q2_6.csv', index=False)
