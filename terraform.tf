
// configure the github provider
provider "github" {
  token        = "${file("./.secrets/github_access_token")}"
  organization = "kfwong"
}

// Configure the repository with the dynamically created Netlify key.
resource "github_repository_deploy_key" "key" {
  title      = "Netlify"
  repository = "pomona"
  key        = "${netlify_deploy_key.key.public_key}"
  read_only  = false
}

// Create a webhook that triggers Netlify builds on push.
resource "github_repository_webhook" "main" {
  repository = "pomona"
  events     = ["delete", "push", "pull_request"]

  configuration {
    content_type = "json"
    url          = "https://api.netlify.com/hooks/github"
  }

  depends_on = ["netlify_site.main"]
}

# Configure the Netlify Provider
provider "netlify" {
  token = "${file("./.secrets/netlify_access_token")}"
}

# Create a new deploy key for this specific website
resource "netlify_deploy_key" "key" {}

# Define your site
resource "netlify_site" "main" {
  name = "pomona"

  repo {
    repo_branch   = "master"
    command       = "yarn build"
    deploy_key_id = "${netlify_deploy_key.key.id}"
    dir           = "dist/"
    provider      = "github"
    repo_path     = "kfwong/pomona"
  }
}
