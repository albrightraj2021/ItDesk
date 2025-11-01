Get-ChildItem -Path "src" -Recurse -Include *.js,*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '"http://127\.0\.0\.1:8000') {
        $content = $content -replace '"http://127\.0\.0\.1:8000/', '`${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}/'
        $content = $content -replace '"http://127\.0\.0\.1:8000"', '`${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}'
        $content = $content -replace '`http://127\.0\.0\.1:8000/', '`${process.env.REACT_APP_API_URL || "https://web-production-5b5db.up.railway.app"}/'
        Set-Content $_.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($_.Name)"
    }
}
