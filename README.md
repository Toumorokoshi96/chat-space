# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nick_name|string|null: false, foreign_key: false|
|mail_address|string|null: false, foreign_key: false|
|password|string|null: false, foreign_key: false|


### Association
- has_many :groups, thorough: :groups_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: false|
|master_user_id|ingeter|null: false, foreign_key: true|


### Association
- has_many :users, thorough: :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|title|string|null: true, foreign_key: false|
|text|string|null: false, foreign_key: false|
|image_address|string|null: true, foreign_key: false|


### Association
- belongs_to :group
- belongs_to :user
