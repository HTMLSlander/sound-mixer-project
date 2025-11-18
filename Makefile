APP_NAME ?= my-react-app 
COPY ?= copy-file
TEMPLATE_NAME ?= react-tw-ts
FILE_NAME ?= helloooo
PRACTICE_FOLDER = /c/Users/nosoy/Escritorio/programacion/practice
MSG ?= "Update Content"
DESC ?= 


# Vite React, Tailwind, Typescript & Sass Bootstrap Set-up

setup:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/$(TEMPLATE_NAME)" . && mv $(TEMPLATE_NAME) $(FILE_NAME) && cd $(FILE_NAME) && npm i && code .
setup-react:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/react-ts" . && mv react-ts $(FILE_NAME) && cd $(FILE_NAME) && npm i  && code .
setup-react-tw:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/react-tw-ts" . && mv react-tw-ts $(FILE_NAME) && cd $(FILE_NAME) && npm i  && code .
setup-bootstrap:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/bootstrap-static-setup" . && mv bootstrap-static-setup $(FILE_NAME) && cd $(FILE_NAME)  && code .
setup-basic:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/static-html-css-js" . && mv static-html-css-js $(FILE_NAME) && cd $(FILE_NAME)  && code .

# Practice Folder

practice:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/$(TEMPLATE_NAME)" ${PRACTICE_FOLDER} && mv $(TEMPLATE_NAME) $(FILE_NAME) && cd "${PRACTICE_FOLDER}/$(FILE_NAME)" && npm i && code .
practice-react: 
	cp -r /c/Users/nosoy/Escritorio/programacion/templates/react-ts $(PRACTICE_FOLDER) && cd $(PRACTICE_FOLDER) && mv react-ts $(FILE_NAME) && cd $(FILE_NAME) && npm i && code $(PRACTICE_FOLDER)/$(FILE_NAME)
practice-react-tw:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/react-tw-ts" ${PRACTICE_FOLDER} && mv react-tw-ts $(FILE_NAME) && cd "${PRACTICE_FOLDER}/$(FILE_NAME)" && npm i  && code .
practice-bootstrap:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/bootstrap-static-setup" ${PRACTICE_FOLDER} && mv bootstrap-static-setup $(FILE_NAME) && cd "${PRACTICE_FOLDER}/$(FILE_NAME)"  && code .
practice-static:
	cp -r "C:/Users/nosoy/Escritorio/programacion/templates/static-html-css-js" ${PRACTICE_FOLDER} && mv static-html-css-js $(FILE_NAME) && cd "${PRACTICE_FOLDER}/$(FILE_NAME)"  && code .
# practice-react:
#     cp -r /c/Users/nosoy/Escritorio/programacion/templates/react-ts $(PRACTICE_FOLDER) && cd $(PRACTICE_FOLDER) && mv react-ts $(FILE_NAME) && cd $(FILE_NAME) && npm i && code $(PRACTICE_FOLDER)

# Github commands

fork:
	git clone https://github.com/HTMLSlander/$(REPO_GIT).git && code $(REPO_GIT)

deploy:
	git add . && git commit -m "${MSG}" -m "${DESC}" && git push origin main

add:
	git add .

am:
	git commit -m "Commit from Makefile" && git push origin main

first-deploy:
	git init
	git add .
	git commit -m "first commit"
	git branch -M main
	git remote add origin $(REPO_LINK)
	git push -u origin main

# Stash commands
# git commit --no-edit
# git checkout
# git pull origin main/master
