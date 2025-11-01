Get-ChildItem -Path "src" -Recurse -Include *.js,*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $updated = $false
    
    # Replace all variations of 127.0.0.1 references
    if ($content -match '127\.0\.0\.1') {
        $content = $content -replace '127\.0\.0\.1:8000', '${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}'
        $content = $content -replace '127\.0\.0\.1', '${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}'
        $content = $content -replace 'localhost:8000', '${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}'
        $updated = $true
    }
    
    if ($updated) {
        Set-Content $_.FullName -Value $content -NoNewline
        Write-Host "Updated: $($_.FullName)"
    }
}
Write-Host "`nAll 127.0.0.1 references replaced!"
