import nltk
from nltk import word_tokenize
from nltk.util import ngrams
from collections import Counter
import numpy as np 
import pandas as pd 
import csv
import string
from nltk.corpus import stopwords

file = pd.read_csv('listings.csv')

top_rated = file[file.review_scores_rating == 100]
low_rated = file[file.review_scores_rating < 70] # maybe issues here

top_concat = ' '.join(top_rated["summary"].astype(str))
low_concat = ' '.join(low_rated["summary"].astype(str))

stop = set(stopwords.words('english'))
stop.add('Zeus')
stop.add('1375+')

token_top = nltk.word_tokenize(top_concat)
token_top = [t for t in token_top if t not in stop and t not in string.punctuation]
bigrams_top = ngrams(token_top, 2)
trigrams_top = ngrams(token_top, 3)

token_low = nltk.word_tokenize(low_concat)
token_low = [t for t in token_low if t not in stop and t not in string.punctuation]
bigrams_low = ngrams(token_low, 2)
trigrams_low = ngrams(token_low, 3)

trigram_top = dict(Counter(trigrams_top))
trigram_top = {k: v for k, v in sorted(trigram_top.items(), key=lambda item: item[1], reverse=True)}
trigram_bot = dict(Counter(trigrams_low))
trigram_bot = {k: v for k, v in sorted(trigram_bot.items(), key=lambda item: item[1], reverse=True)}
res = {key: trigram_top[key] - trigram_bot.get(key, 0) for key in trigram_top.keys()} 

# with open('q3_bot_total_list.csv', 'w', newline='') as file:
# 	writer = csv.writer(file)
	 

best_trigrams = set(list(trigram_top)[:100]) - set(list(trigram_bot)[:100])
worst_trigrams = set(list(trigram_bot)[:100]) - set(list(trigram_top)[:100])

best_trigrams_expand = set(list(trigram_top)[:1000]) - set(list(trigram_bot)[:1000])
worst_trigrams_expand = set(list(trigram_bot)[:1000]) - set(list(trigram_top)[:1000])

for trigram in best_trigrams: 
	str_search = trigram[0] + " " + trigram[1] + " " + trigram[2]
	# print(str_search)
	top = (top_rated[top_rated['summary'].str.contains(str_search, na=False)])
	if (top.empty): 
		# print("None") 
	else: 
		# print (top['summary'].iloc[0])
		# print (top['summary'].iloc[1])

with open('q3_bot_total_list.csv', 'w', newline='') as file: 
	writer = csv.writer(file)
	writer.writerow(['trigram'])
	for trigram in worst_trigrams_expand: 
		str_search = trigram[0] + " " + trigram[1] + " " + trigram[2]
		writer.writerow([str_search])

with open('q3_top_total_list.csv', 'w', newline='') as file: 
	writer = csv.writer(file)
	writer.writerow(['trigram'])
	for trigram in best_trigrams_expand: 
		str_search = trigram[0] + " " + trigram[1] + " " + trigram[2]
		writer.writerow([str_search])

with open('q3_bot.csv', 'w', newline='') as file: 
	writer = csv.writer(file)
	writer.writerow(['trigram', 'text'])
	for trigram in worst_trigrams: 
		str_search = trigram[0] + " " + trigram[1] + " " + trigram[2]
		# print(str_search)
		bot = (low_rated[low_rated['summary'].str.contains(str_search, na=False)])
		if (bot.empty): 
			# print("None") 
		else: 
			writer.writerow([str_search, bot['summary'].iloc[0]])
			# print (bot['summary'].iloc[0])
			# print (bot['summary'].iloc[1])

with open('q3_top.csv', 'w', newline='') as file: 
	writer = csv.writer(file)
	writer.writerow(['trigram', 'text'])
	for trigram in best_trigrams: 
		str_search = trigram[0] + " " + trigram[1] + " " + trigram[2]
		# print(str_search)
		top = (top_rated[top_rated['summary'].str.contains(str_search, na=False)])
		if (top.empty): 
			# print("None") 
		else: 
			writer.writerow([str_search, top['summary'].iloc[0]])
			# print (top['summary'].iloc[0])
			# print (top['summary'].iloc[1])


bigram_top = dict(Counter(bigrams_top))
bigram_top = {k: v for k, v in sorted(bigram_top.items(), key=lambda item: item[1], reverse=True)}
bigram_bot = dict(Counter(bigrams_low))
bigram_bot = {k: v for k, v in sorted(bigram_bot.items(), key=lambda item: item[1], reverse=True)}
res = {key: bigram_top[key] - bigram_bot.get(key, 0) for key in bigram_top.keys()} 


# print(set(list(bigram_top)[:50]) - set(list(bigram_bot)[:50]))
# print(set(list(bigram_bot)[:50]) - set(list(bigram_top)[:50]))


