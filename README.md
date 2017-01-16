##idea
This simple program does not take the Linguistic Distance into account. It only
tries to group students who don't speak the same language as hard as possible

##input.csv
Just a list of student names and language they speak. You can edit this list for your own

##usage
`node group.js "4,4,4,5"`

the first param is the group config, 4,4,4,5 means 4 groups which have 4,4,4,5 students in them.

The second (optional) param is the rounds to test. As this algo does not return a definitive. Default to 3.
So if you want to run more rounds, just use `node group.js "4,4,4,5" num_of_rounds`

As this algorithm does not reach an optimal solution, but simply trying more times with randomized student sequence input
will significantly hit the chance of reaching an optimal solution.
