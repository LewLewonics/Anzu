c=1
for d in */ ; do
	mv -v "$d" "$c"
	c=$(($c+1))
done
