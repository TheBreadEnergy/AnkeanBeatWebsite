<h1 align="center">Ankean beat store</h1>
<p align="center">

<img src="https://img.shields.io/badge/made%20by-Amovet-blue.svg" >

<img src="https://img.shields.io/badge/react-18.2.0-green.svg">

<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" >

<img src="https://img.shields.io/github/stars/Amovet/AnkeanBeatWebsite.svg?style=flat">

</p>

<img src="https://user-images.githubusercontent.com/57827473/201481169-b38196dc-4a1e-4de0-a8e5-af05eb5bffae.png" width="100%">

<h2 align="center"><a  href="http://ankean.site/" target="_blank">View site</a> (only http*)</h2>

## Description
The site is a personal place of sale of instrumentals, implemented by scratch on **React** using **Redux**. BackEnd temporarily implemented on **Django**,  with registration using **JWT** and **google oAuth** , ability to write notes to tracks. There is also a search for instrumentals depending on their style, genre, bpm.
<p align="center">HOW IT WORKS AT THE MOMENT</p>

![Untitled](https://user-images.githubusercontent.com/57827473/201535555-6c648174-e5df-41ef-9c50-f3864d4ac569.gif)

The interface has been adapted to mobile devices, which has forced a radical change in the appearance of the player

<h2 align="center"><img src="https://user-images.githubusercontent.com/57827473/201695366-3333f71d-d993-4456-9bf3-850fd36988c3.gif" width="30%" height="60%" align='center'></h2>

It is also possible to change the language

![1](https://user-images.githubusercontent.com/57827473/201701348-772c1562-ad3d-4ac5-971d-024d284b7da1.gif)

## Project setup

```
git clone https://github.com/Amovet/AnkeanBeatWebsite.git
cd .\AnkeanBeatWebsite
pip install virtualenv 
python -m venv venv
venv\Scripts\activate 
pip install -r requirements.txt
python manage.py runserver
```

<p align="left">In new console</p>

```
cd .\AnkeanBeatWebsite
cd .\frontend\
npm install
npm start
```

## In future plans
сhange backend from Django to NodeJs, add a payment option, add an option to record a demo track with various effects
