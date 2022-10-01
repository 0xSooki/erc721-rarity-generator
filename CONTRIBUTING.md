<a href="https://storz-test.pages.dev/" target="_blank">
    <img src="https://user-images.githubusercontent.com/63467479/190611518-b60d57af-711b-4b8b-9de5-eb2d51ddcb59.png" alt="Project Banner">
</a>


# Welcome to Hacktoberfest !!!

Hello coders! We welcome everyone to join our quest and contribute in this web3 project. Also make sure to check out the [README](https://github.com/0xSooki/nft-rarity-generator#readme) to get a better understanding of this repo. 


### Also, get yourself free goodies after a successful pull/merge request!


# What is Hacktoberfest?

Hacktoberfest is for everyone. It is a month-long celebration from October 1st - 31st sponsored by [Digital Ocean](https://hacktoberfest.digitalocean.com/) and [GitHub](https://github.com/blog/2433-celebrate-open-source-this-october-with-hacktoberfest) to get people involved in [Open Source](https://github.com/open-source). Create your very first pull request to any public repository on GitHub and contribute to the open source developer community.

[https://hacktoberfest.digitalocean.com/](https://hacktoberfest.digitalocean.com/)

## Steps to follow :scroll:

### 1. Register for the Hacktoberfest :

https://hacktoberfest.digitalocean.com/

### 2. Give this Project a Star :

If you liked working on this repo, please share this repo as much
as you can and star this repo to help as many people in open-source as you can.


### 3. Fork it :

You can get your own fork/copy of this project [NFT rarity generator](https://github.com/0xSooki/nft-rarity-generator) by using the <kbd><b>Fork</b></kbd></a> button


### 4. Ready, Steady, Go... :

Once you have completed these steps, you are ready to start contributing
by checking our [issues tab](https://github.com/0xSooki/nft-rarity-generator/issues) and creating [pull requests](https://github.com/0xSooki/nft-rarity-generator/pulls).


# Steps to make changes and contribute using GIT!

To make your own local copy of the repository you would like to contribute to, let’s first open up a terminal window.

We’ll use the `git clone` command along with the URL that points to your fork of the repository.

This URL will be similar to the URL above, except now it will end with `.git` . The URL will look like this:

https://github.com/0xSooki/nft-rarity-generator.git

You can alternatively copy the URL by using the green "Clone or download" button from your repository page that you just forked from the original repository page. Once you click the button, you’ll be able to copy the URL by clicking the binder button next to the URL:

Once we have the URL, we’re ready to clone the repository. To do this, we’ll combine the `git clone` command with the repository URL from the command line in a terminal window:

```
git clone https://github.com/0xSooki/nft-rarity-generator.git
```

### 5. Create a New Branch

To create your branch, from your terminal window, change your directory so that you are working in the directory of the repository. Be sure to use the actual name of the repository (i.e. nft-rarity-generator) to change into that directory.

```
cd nft-rarity-generator
```

Now, we'll create our new branch with the `git branch` command. Make sure you name it descriptively so that others working on the project understand what you are working on.

```
git branch my-branch
```

Now that our new branch is created, we can switch to make sure that we are working on that branch by using the git checkout command:

```
git checkout my-branch
```

Once you enter the git checkout command, you will receive the following output:

```
Output:
Switched to branch 'my-branch'
```

At this point, you can now modify existing files or add new files to the project on your own branch.

#### Make Changes Locally

Once you have modified existing files or added new files to the project, you can add them to your local repository, which you can do with the `git add` command. Let’s add the `-A` flag to add all changes that we have made:

```
git add -A
```

or

```
git add .
```

Next, we’ll want to record the changes that we made to the repository with the git commit command.

The commit message is an important aspect of your code contribution; it helps the other contributors fully understand the change you have made, why you made it, and how significant it is. Additionally, commit messages provide a historical record of the changes for the project at large, helping future contributors along the way.

If you have a very short message, you can record that with the `-m` flag and the message in quotes:

Example:

```
git commit -m "Updated Readme.md"
```

At this point you can use the `git push` command to push the changes to the current branch of your forked repository:

Example:

```
git push --set-upstream origin new-branch
```

### 6. Update Local Repository (Important!)

While you are working on a project alongside other contributors, it is important for you to keep your local repository up-to-date with the project as you don't want to make a pull request for code that will cause conflicts. To keep your local copy of the code base updated, you'll need to sync changes.

We'll first go over configuring a remote for the fork, then syncing the fork.

### 7. Configure a Remote for the Fork

Next, you'll have to specify a new remote upstream repository for us to sync with the fork. This will be the original repository that you forked from. You'll have to do this with the `git remote add` command.

```
git remote add upstream https://github.com/0xSooki/nft-rarity-generator.git
```

In this example, `upstream` is the shortname we have supplied for the remote repository since in terms of Git, "upstream" refers to the repository that you cloned from. If you want to add a remote pointer to the repository of a collaborator, you may want to provide that collaborator’s username or a shortened nickname for the shortname.

### 8. Sync the Fork

Once you have configured a remote that references the upstream and original repository on GitHub, you are ready to sync your fork of the repository to keep it up-to-date.

To sync your fork, from the directory of your local repository in a terminal window, you’ll have to use the `git fetch` command to fetch the branches along with their respective commits from the upstream repository. Since you used the shortname "upstream" to refer to the upstream repository, you’ll have to pass that to the command:

```
git fetch upstream
```

Switch to the local main branch of your repository:

```
git checkout main
```

You'll now have to merge any changes that were made in the original repository's main branch, that you will access through your local upstream/main branch, with your local main branch:

```
git merge upstream/main
```

### 9. Create Pull Request

At this point, you are ready to make a pull request to the original repository.

You should navigate to your forked repository, and press the “New pull request” button on your left-hand side of the page.

Don't forget to star this repository ✨

# Hurray! You just got closer to complete your hacktoberfest challenge.
