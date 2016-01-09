# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160109005532) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "answer_choices", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "answer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "answer_choices", ["answer_id"], name: "index_answer_choices_on_answer_id", using: :btree
  add_index "answer_choices", ["user_id"], name: "index_answer_choices_on_user_id", using: :btree

  create_table "answers", force: :cascade do |t|
    t.string   "text"
    t.integer  "question_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "question_type"
    t.integer  "quiz_id"
    t.string   "text"
    t.integer  "correct_answer_id"
    t.text     "explanation"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "questions", ["correct_answer_id"], name: "index_questions_on_correct_answer_id", using: :btree
  add_index "questions", ["quiz_id"], name: "index_questions_on_quiz_id", using: :btree

  create_table "quizzes", force: :cascade do |t|
    t.string   "title"
    t.string   "day"
    t.integer  "max_time"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "number_of_questions", null: false
  end

  create_table "user_quizzes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "quiz_id"
    t.date     "finished_time"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "unique_identifier"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

end
