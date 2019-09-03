# Image Creator (for [djbammer.net](https://djbammer.net))

## Instructions:

This is a Rails 6 app. You will need to have [Ruby on Rails](https://rubyonrails.org) installed.

Install everything via `bundle install` and then run the Rails server by typing `rails s` on the terminal. Visit `http://localhost:3000`.

## What does it do?

For my [DJ Website](https://djbammer.net), I always need to create 2 pictures. This Rails app fetches 10 images from the `app/assets/images/covers` folder and presents 2 pictures in the sizes I need, with the help of CSS Grid.

By clicking "Download" you get each picture, named after the month you're in (you can change that).

## Dependencies:

- [dayjs](https://github.com/iamkun/dayjs)
- [dom-to-image](https://github.com/tsayen/dom-to-image)
