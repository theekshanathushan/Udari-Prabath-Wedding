Add-Type -AssemblyName System.Drawing

function Create-CardImage($path, $title, $subtitle) {
    $bmp = New-Object System.Drawing.Bitmap 800, 500
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # Deep Maroon Background
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(68, 9, 21))
    $g.FillRectangle($brush, 0, 0, 800, 500)

    # Gold Inner Border
    $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(212, 175, 55), 3)
    $g.DrawRectangle($pen, 20, 20, 760, 460)

    # Fonts
    $fontTitle = New-Object System.Drawing.Font ('Georgia', 28, [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font ('Georgia', 16, [System.Drawing.FontStyle]::Italic)
    $fontHint = New-Object System.Drawing.Font ('Arial', 11, [System.Drawing.FontStyle]::Regular)

    $goldBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(212, 175, 55))
    $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $hintBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(254, 223, 162))

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center

    $g.DrawString($title, $fontTitle, $goldBrush, 400, 160, $sf)
    $g.DrawString($subtitle, $fontSub, $whiteBrush, 400, 230, $sf)
    $g.DrawString("(Place couple photo here: $path)", $fontHint, $hintBrush, 400, 310, $sf)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated $path"
}

# Generate Story Placeholders
Create-CardImage "assets/images/story-1.jpg" "Where Our Paths Crossed" "Chapter I - The Beginning"
Create-CardImage "assets/images/story-2.jpg" "Growing Hand in Hand" "Chapter II - Shared Adventures"
Create-CardImage "assets/images/story-3.jpg" "A Promise for Eternity" "Chapter III - She Said Yes"
Create-CardImage "assets/images/venue.jpg" "Cinnamon Grand Colombo" "The Oak Room / Grand Ballroom"
Create-CardImage "assets/images/og-preview.jpg" "Udari & Prabath" "Wedding Invitation - 12th December 2026"
