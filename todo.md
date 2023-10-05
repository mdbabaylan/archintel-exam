-VUE-
Components / Frontend (no functionalities yet, just the html/componnents)
>VUE initial setup ///  Oct 4
>Router - working ///  Oct 4
>Dashboard for Writer ///  Oct 4
>Dashboard for Editor ///  Oct 4
>>Add a button (Add article button), writer only ///  Oct 4
>>Add Article Form modal (), /// used WYSIWYG as a bonus
>>Login Form /// Oct 4
>>Edit Article modal () >> copy paste Add article modal, but come back to this later when backend is ready to go
>>All Media //writer only for now, copy-paste for editor, best to do when mock server is functional, mock server after lunchbreak. LFG




-Backend-
MockServer (use seperate project? worry about this later, VUE components first)




-Mix and Match-
>add axios to Vue Project

>>login logic Vue -> ok ////
>>Implement logout/no access if VueX writer/editor empty => ////
>>all working, weird bug in Vue though -> refresh browser -> state resets, so you get logged out (fix this after finishing the article functions, not a prio) ARTICLES first

>>All media fetch from API json server writer AND editor (except the Edit Article function) //
>>fetch from API json server for Writer and Editor's dashboard (also double check the logic) (except the Article functions) 

>>Dynamically show Writer/EditorDashboard, depending on the type of user (use VUEX)
>>View article, replace hardcoded data with actual API json-server data
>>Add article 
>>Edit article (re-use same modal)

-Get everything working locally
!!!Document in readme.md how to get your project running (test it too, fresh github clone, npm install then npm run serve iirc)!!!

-use .env, deploy backend to GCP VM or firebase first before surge (so you can get the URL and match it to the .env)
-Deploy backend to GCP VM / Firebase
-Deploy VUE to Surge 

