npm install -g yarn
yarn --init
docker container run -d --name postgres_prisma_crud_db -p 5432:5432 -e POSTGRES_USER=dev -e POSTGRES_PASSWORD=devtest -e POSTGRES_DB=books postgres:14
New-Item .\.env
$URL_DB = '"postgresql://dev:devtest@localhost:5432/books?schema=public"'
Set-Content .\.env "DATABASE_URL=$URL_DB"
npx prisma generate
npx prisma migrate dev --preview-feature --name "init"
npx prisma db seed
yarn dev