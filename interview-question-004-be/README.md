# Person API

ASP.NET Core 8 Web API using Entity Framework Core and MySQL. The database tables are created automatically when the API starts.

```powershell
docker compose up --build
```

API: `http://localhost:8081/api/people`

Example:

```powershell
$body = @{
  firstName = "Somchai"
  lastName = "Jaidee"
  email = "somchai@example.com"
  phone = "0812345678"
  profile = "iVBORw0KGgo="
  birthDate = "20/05/1995"
  occupation = "Developer"
  sex = "Male"
} | ConvertTo-Json

Invoke-RestMethod http://localhost:8081/api/people -Method Post -ContentType application/json -Body $body
```
