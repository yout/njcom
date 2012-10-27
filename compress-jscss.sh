if [ "$1" = "" ] ; then
	echo "add the svn path as the param. such as: sh ./compress-jscss.sh http://svn.alibaba-inc.com/repos/ali_itu/bss/alp_static/branches/20121015_yout_test_nodejs"
	exit 0
fi

echo "svn path: $1"

svnPath=$1

if [ ! -x "alp-static" ]; then 
	echo "${dirName} no exists, create it." 
	svn co $svnPath alp-static
	cd alp-static
else
	cd alp-static
	svn switch $svnPath
fi

echo "[=== start compile js. ===]"
node /home/admin/graceCode/compile.js -t JS
echo "[=== end compile js. ===]"

echo "[=== start compile css. ===]"
node /home/admin/graceCode/compile.js -t CSS
echo "[=== end compile css. ===]"

echo "[=== compile complete! ===]"

echo "[=== commit js/css! ===]"
svn commit -m "compress js or css. auto commit. $(date '+%Y-%m-%d %H:%M:%S')"
echo "[=== commit js/css successfully! ===]"


