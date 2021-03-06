import csv
import json
from geojson import Feature, FeatureCollection, Point

features = []
with open('listings.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    next(reader)
    for row in reader:
        _, listing_url, scrape_id, last_scraped, name, summary, space, description, experiences_offered, neighborhood_overview, notes, transit, access, interaction, house_rules, thumbnail_url, medium_url, picture_url, xl_picture_url, host_id, host_url, host_name, host_since, host_location, host_about, host_response_time, host_response_rate, host_acceptance_rate, host_is_superhost, host_thumbnail_url, host_picture_url, host_neighbourhood, host_listings_count, host_total_listings_count, host_verifications, host_has_profile_pic, host_identity_verified, street, neighbourhood, neighbourhood_cleansed, neighbourhood_group_cleansed, city, state, zipcode, market, smart_location, country_code, country, latitude, longitude, is_location_exact, property_type, room_type, accommodates, bathrooms, bedrooms, beds, bed_type, amenities, square_feet, price, weekly_price, monthly_price, security_deposit, cleaning_fee, guests_included, extra_people, minimum_nights, maximum_nights, minimum_minimum_nights, maximum_minimum_nights, minimum_maximum_nights, maximum_maximum_nights, minimum_nights_avg_ntm, maximum_nights_avg_ntm, calendar_updated, has_availability, availability_30, availability_60, availability_90, availability_365, calendar_last_scraped, number_of_reviews, number_of_reviews_ltm, first_review, last_review, review_scores_rating, review_scores_accuracy, review_scores_cleanliness, review_scores_checkin, review_scores_communication, review_scores_location, review_scores_value, requires_license, _, jurisdiction_names, instant_bookable, is_business_travel_ready, cancellation_policy, require_guest_profile_picture, require_guest_phone_verification, calculated_host_listings_count, calculated_host_listings_count_entire_homes, calculated_host_listings_count_private_rooms, calculated_host_listings_count_shared_rooms, reviews_per_month = row
        latitude, longitude = map(float, (latitude, longitude))
        features.append(
            Feature(
                geometry=Point((longitude, latitude)),
                properties={
                    # 'id': id,
                    # 'listing_url': listing_url,
                    # 'scrape_id': scrape_id,
                    # 'last_scraped': last_scraped,
                    'name': name,
                    # 'summary': summary,
                    # 'space': space,
                    # 'description': description,
                    # 'experiences_offered': experiences_offered,
                    # 'neighborhood_overview': neighborhood_overview,
                    # 'notes': notes,
                    # 'transit': transit,
                    # 'access': access,
                    # 'interaction': interaction,
                    # 'house_rules': house_rules,
                    # 'thumbnail_url': thumbnail_url,
                    # 'medium_url': medium_url,
                    # 'picture_url': picture_url,
                    # 'xl_picture_url': xl_picture_url,
                    # 'host_id': host_id,
                    # 'host_url': host_url,
                    # 'host_name': host_name,
                    # 'host_since': host_since,
                    # 'host_location': host_location,
                    # 'host_about': host_about,
                    # 'host_response_time': host_response_time,
                    # 'host_response_rate': host_response_rate,
                    # 'host_acceptance_rate': host_acceptance_rate,
                    # 'host_is_superhost': host_is_superhost,
                    # 'host_thumbnail_url': host_thumbnail_url,
                    # 'host_picture_url': host_picture_url,
                    # 'host_neighbourhood': host_neighbourhood,
                    # 'host_listings_count': host_listings_count,
                    # 'host_total_listings_count': host_total_listings_count,
                    # 'host_verifications': host_verifications,
                    # 'host_has_profile_pic': host_has_profile_pic,
                    # 'host_identity_verified': host_identity_verified,
                    'street': street,
                    # 'neighbourhood': neighbourhood,
                    'neighbourhood_cleansed': neighbourhood_cleansed,
                    # 'neighbourhood_group_cleansed': neighbourhood_group_cleansed,
                    # 'city': city,
                    # 'state': state,
                    # 'zipcode': zipcode,
                    # 'market': market,
                    # 'smart_location': smart_location,
                    # 'country_code': country_code,
                    # 'country': country,
                    'latitude': latitude,
                    'longitude': longitude,
                    # 'is_location_exact': is_location_exact,
                    # 'property_type': property_type,
                    # 'room_type': room_type,
                    'accommodates': accommodates,
                    'bathrooms': bathrooms,
                    'bedrooms': bedrooms,
                    'beds': beds,
                    # 'bed_type': bed_type,
                    # 'amenities': amenities,
                    'square_feet': square_feet,
                    'price': price,
                    # 'weekly_price': weekly_price,
                    # 'monthly_price': monthly_price,
                    # 'security_deposit': security_deposit,
                    # 'cleaning_fee': cleaning_fee,
                    # 'guests_included': guests_included,
                    # 'extra_people': extra_people,
                    # 'minimum_nights': minimum_nights,
                    # 'maximum_nights': maximum_nights,
                    # 'minimum_minimum_nights': minimum_minimum_nights,
                    # 'maximum_minimum_nights': maximum_minimum_nights,
                    # 'minimum_maximum_nights': minimum_maximum_nights,
                    # 'maximum_maximum_nights': maximum_maximum_nights,
                    # 'minimum_nights_avg_ntm': minimum_nights_avg_ntm,
                    # 'maximum_nights_avg_ntm': maximum_nights_avg_ntm,
                    # 'calendar_updated': calendar_updated,
                    'has_availability': has_availability,
                    # 'availability_30': availability_30,
                    # 'availability_60': availability_60,
                    # 'availability_90': availability_90,
                    # 'availability_365': availability_365,
                    # 'calendar_last_scraped': calendar_last_scraped,
                    # 'number_of_reviews': number_of_reviews,
                    # 'number_of_reviews_ltm': number_of_reviews_ltm,
                    # 'first_review': first_review,
                    # 'last_review': last_review,
                    'review_scores_rating': review_scores_rating,
                    # 'review_scores_accuracy': review_scores_accuracy,
                    # 'review_scores_cleanliness': review_scores_cleanliness,
                    # 'review_scores_checkin': review_scores_checkin,
                    # 'review_scores_communication': review_scores_communication,
                    # 'review_scores_location': review_scores_location,
                    # 'review_scores_value': review_scores_value,
                    # 'requires_license': requires_license,
                    # 'license': license,
                    # 'jurisdiction_names': jurisdiction_names,
                    # 'instant_bookable': instant_bookable,
                    # 'is_business_travel_ready': is_business_travel_ready,
                    # 'cancellation_policy': cancellation_policy,
                    # 'require_guest_profile_picture': require_guest_profile_picture,
                    # 'require_guest_phone_verification': require_guest_phone_verification,
                    # 'calculated_host_listings_count': calculated_host_listings_count,
                    # 'calculated_host_listings_count_entire_homes': calculated_host_listings_count_entire_homes,
                    # 'calculated_host_listings_count_private_rooms': calculated_host_listings_count_private_rooms,
                    # 'calculated_host_listings_count_shared_rooms': calculated_host_listings_count_shared_rooms,
                    # 'reviews_per_month': reviews_per_month
                }
            )
        )

collection = FeatureCollection(features)
with open("geodata1.js", "w") as f:
    f.write('%s' % collection)
