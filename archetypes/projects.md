+++
date = '{{ .Date }}'
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
description = "Project description"
[[links]]
  name = "Test link"
  href = "https://google.com"
  icon = "globe"
  vendor = "feather"
+++

Project body.
