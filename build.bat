git add --all
git commit -m "Un Commmit"
git push origin
git push heroku master
heroku ps:scale web=1
heroku open