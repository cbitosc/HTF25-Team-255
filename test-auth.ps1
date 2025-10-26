# Test authentication flow
$baseUrl = "http://localhost:4000/api"

Write-Host "=== Testing Backend Authentication ===" -ForegroundColor Cyan

# 1. Health check
Write-Host "`n1. Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✅ Backend is healthy: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. Register new user
Write-Host "`n2. Registering new user..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$registerData = @{
    email = "test$timestamp@example.com"
    password = "TestPassword123!"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $registerData -ContentType "application/json"
    Write-Host "✅ Registration successful!" -ForegroundColor Green
    Write-Host "   User: $($registerResponse.user.email)" -ForegroundColor Gray
    Write-Host "   Access Token: $($registerResponse.accessToken.Substring(0, 20))..." -ForegroundColor Gray
    
    # Save for login test
    $email = $registerResponse.user.email
    $userId = $registerResponse.user.id
} catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

# 3. Login with same user
Write-Host "`n3. Logging in..." -ForegroundColor Yellow
$loginData = @{
    email = $email
    password = "TestPassword123!"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "   User: $($loginResponse.user.email)" -ForegroundColor Gray
    Write-Host "   Access Token: $($loginResponse.accessToken.Substring(0, 20))..." -ForegroundColor Gray
    
    $accessToken = $loginResponse.accessToken
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Response: $($_.ErrorDetails.Message)" -ForegroundColor Red
    exit 1
}

# 4. Get profile with token
Write-Host "`n4. Fetching profile..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $accessToken"
    }
    $profile = Invoke-RestMethod -Uri "$baseUrl/auth/profile" -Method Get -Headers $headers
    Write-Host "✅ Profile fetched successfully!" -ForegroundColor Green
    Write-Host "   Name: $($profile.firstName) $($profile.lastName)" -ForegroundColor Gray
    Write-Host "   Email: $($profile.email)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Profile fetch failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== All Tests Passed! ===" -ForegroundColor Green
Write-Host "`nYou can now use these credentials to login on the frontend:" -ForegroundColor Cyan
Write-Host "  Email: $email" -ForegroundColor White
Write-Host "  Password: TestPassword123!" -ForegroundColor White
Write-Host "`nFrontend URL: http://localhost:3000" -ForegroundColor Cyan
