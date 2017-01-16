##how it works
Use round robin to distribute students into different buckets.

1. Group students by their features. Each student comes with a name and feature,
and we need to (optionally) specify the feature groups, so that students with the same feature
are grouped together
2. Rank those group by their number in descending order
3. Flatten the group
4. Just enumerate the flattened list and put to the buckets, the number of the buckets are specified by user

By doing so, we can group students by separating those who share the same features (like speak the same language)
into different buckets.

##usage
`node cli.js numOfGroup -f path_to_input_csv`

##todo
Find a good cluster of Linguistic Distance
