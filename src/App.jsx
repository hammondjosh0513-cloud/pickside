import { useState, useEffect } from "react"

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import './App.css'

import { supabase } from "./supabase"


function Home() {

  return (

    <div className="app">

      <header className="navbar">

        <Link
          to="/"
          className="logo-link"
        >

          <div className="logo">
            Pick<span>Side</span>
          </div>

        </Link>

        <Link
          to="/create"
          className="create-btn"
        >
          Create my link
        </Link>

      </header>


      <main className="home-page">

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              👀 ANONYMOUS MESSAGES AWAIT
            </div>

            <h1>

              Find out what your friends

              <span>
                {' '}
                really think.
              </span>

            </h1>

            <p className="description">

              Create your anonymous PickSide link,
              share it with your friends,
              and discover what they really think about you.

            </p>

            <Link
              to="/create"
              className="main-btn"
            >
              Get my anonymous link →
            </Link>

          </div>


          <div className="message-phone">

            <div className="phone-top">

              <span className="phone-dot"></span>

              <span>
                Someone sent you a message
              </span>

            </div>

            <div className="anonymous-message">

              <div className="message-icon">
                💬
              </div>

              <p>
                You're actually really funny 😂
              </p>

            </div>

            <div className="anonymous-message second-message">

              <div className="message-icon">
                👀
              </div>

              <p>
                Who is your crush? 👀
              </p>

            </div>

            <div className="anonymous-message third-message">

              <div className="message-icon">
                🔥
              </div>

              <p>
                You should post more often!
              </p>

            </div>

            <div className="phone-footer">
              🔒 Completely anonymous
            </div>

          </div>

        </section>

      </main>

    </div>

  )

}



function CreateLink() {

  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event) {

    event.preventDefault()

    if (!username.trim()) {

      alert('Please enter a username')

      return

    }

    navigate(`/inbox/${username.trim()}`)

  }

  return (

    <div className="create-link-page">

      <div className="create-link-card">

        <Link
          to="/"
          className="back-link"
        >
          ← Back home
        </Link>

        <div className="create-icon">
          🔗
        </div>

        <h1>
          Create your anonymous link
        </h1>

        <p>
          Choose a username and start receiving anonymous messages.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="username-input">

            <span>
              pickside.app/
            </span>

            <input
              type="text"
              placeholder="yourusername"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
            />

          </div>

          <button
            type="submit"
            className="create-link-button"
          >
            Create my link →
          </button>

        </form>

      </div>

    </div>

  )

}

function UserPage() {

  const { username } = useParams()

  const [message, setMessage] = useState("")

  const [sent, setSent] = useState(false)

  async function handleSubmit(event) {

    event.preventDefault()

    if (!message.trim()) {

      alert("Please write a message first")

      return

    }

    const { error } = await supabase

      .from("messages")

      .insert([

        {

          username,

          question: message.trim()

        }

      ])

    if (error) {

      alert(error.message)

      return

    }

    setSent(true)

    setMessage("")

    setTimeout(() => {

      setSent(false)

    }, 3000)

  }

  return (

    <div className="user-page">

      <div className="user-card">

        <Link
          to="/"
          className="back-link"
        >
          ← Visit PickSide
        </Link>

        <div className="user-icon">
          💬
        </div>

        <h1>
          Send {username} an anonymous message
        </h1>

        <p>
          Tell {username} what you really think.
          Your identity will remain completely anonymous.
        </p>

        <form onSubmit={handleSubmit}>

          <textarea

            placeholder="Write your anonymous message..."

            value={message}

            onChange={(event) => {

              setMessage(event.target.value)

            }}

          ></textarea>

          <button

            type="submit"

            className="send-message-button"

          >

            Send anonymously →

          </button>

        </form>

        {sent && (

          <div className="success-message">

            ✅ Message sent anonymously!

          </div>

        )}

      </div>

    </div>

  )

}

function Inbox() {

  const { username } = useParams()

  const [messages, setMessages] = useState([])

  useEffect(() => {

    loadMessages()

  }, [])

  async function loadMessages() {

    const { data, error } = await supabase

      .from("messages")

      .select("*")

      .eq("username", username)

      .order("created_at", { ascending: false })

    if (error) {

      console.log(error)

      return

    }

    setMessages(data)

  }

  return (

    <div className="inbox-page">

      <div className="inbox-card">

        <Link
          to="/"
          className="back-link"
        >
          ← Back Home
        </Link>

        <div className="inbox-header">

          <div className="inbox-icon">
            📩
          </div>

          <div>

            <p className="small-text">
              YOUR INBOX
            </p>

            <h1>
              {username}'s Anonymous Messages
            </h1>

          </div>

        </div>

        <p className="share-text">
          Share your anonymous link:
        </p>

        <div className="share-box">

          <input
            type="text"
            readOnly
            value={`${window.location.origin}/user/${username}`}
          />

          <button
            onClick={() => {

              navigator.clipboard.writeText(
                `${window.location.origin}/user/${username}`
              )

              alert("Link copied!")

            }}
          >
            Copy
          </button>

        </div>

        <Link
          to={`/profile/${username}`}
          className="create-link-button"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          👀 View Public Profile
        </Link>

        {messages.length === 0 ? (

          <div className="empty-inbox">

            <div className="empty-inbox-icon">
              💬
            </div>

            <h2>
              No messages yet
            </h2>

            <p>
              Share your PickSide link and your messages will appear here.
            </p>

          </div>

        ) : (

          <div className="messages-list">

            {messages.map((message) => (

              <div
                key={message.id}
                className="inbox-message"
              >

                <div className="inbox-message-icon">
                  💬
                </div>

                <div className="inbox-message-content">

                  <p>

                    {message.question.length > 45
                      ? message.question.slice(0, 45) + "..."
                      : message.question}

                  </p>

                  <span>

                    {new Date(message.created_at).toLocaleString()}

                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px"
                    }}
                  >

                    <button
                      onClick={() => {

                        const link =
                          `${window.location.origin}/question/${message.id}`

                        navigator.clipboard.writeText(link)

                        alert("Question link copied!")

                      }}
                    >

                      🔗 Copy Question Link

                    </button>

                  </div>

                  {message.replied && (

                    <p
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        marginTop: "8px"
                      }}
                    >
                      ✅ Answered
                    </p>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )

}

function MessageDetails() {

  const { username, id } = useParams()

  const navigate = useNavigate()

  const storageKey = `pickside-${username}`

  const messages = JSON.parse(

    localStorage.getItem(storageKey)

  ) || []

  const message = messages[id]

  const [reply, setReply] = useState(message?.reply || "")

  if (!message) {

    return (

      <div className="user-page">

        <div className="user-card">

          <h1>
            Message not found
          </h1>

          <Link
            to={`/inbox/${username}`}
            className="back-link"
          >
            ← Back to Inbox
          </Link>

        </div>

      </div>

    )

  }

  function saveReply() {

    if (!reply.trim()) {

      alert("Please write a reply first.")

      return

    }

    const allMessages = JSON.parse(

      localStorage.getItem(storageKey)

    ) || []

    allMessages[id].reply = reply.trim()

    allMessages[id].replied = true

    localStorage.setItem(

      storageKey,

      JSON.stringify(allMessages)

    )

    alert("Reply saved successfully!")

  }

  function deleteMessage() {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this message?"

    )

    if (!confirmDelete) {

      return

    }

    const allMessages = JSON.parse(

      localStorage.getItem(storageKey)

    ) || []

    allMessages.splice(Number(id), 1)

    localStorage.setItem(

      storageKey,

      JSON.stringify(allMessages)

    )

    alert("Message deleted!")

    navigate(`/inbox/${username}`)

  }

  return (

    <div className="user-page">

      <div className="user-card">

        <Link
          to={`/inbox/${username}`}
          className="back-link"
        >
          ← Back to Inbox
        </Link>

        <div className="user-icon">
          💬
        </div>

        <h1>
          Anonymous Message
        </h1>

        <p>
          {message.text}
        </p>

        <small>
          {message.date}
        </small>

        <textarea

          placeholder="Write your reply..."

          value={reply}

          onChange={(event) => {

            setReply(event.target.value)

          }}

        ></textarea>

        <button

          className="send-message-button"

          onClick={saveReply}

        >

          Save Reply

        </button>

        <button

          className="delete-button"

          onClick={deleteMessage}

        >

          🗑 Delete Message

        </button>

        {message.replied && (

          <div className="success-message">

            ✅ This message has been answered.

          </div>

        )}

      </div>

    </div>

  )

}

function Profile() {

  const { username } = useParams()

  const [messages, setMessages] = useState([])

  useEffect(() => {

    loadMessages()

  }, [])

  async function loadMessages() {

    const { data, error } = await supabase

      .from("messages")

      .select("*")

      .eq("username", username)

      .eq("replied", true)

      .order("created_at", { ascending: false })

    if (error) {

      console.log(error)

      return

    }

    setMessages(data)

  }

  return (

    <div className="user-page">

      <div className="user-card">

        <Link
          to={`/inbox/${username}`}
          className="back-link"
        >
          ← Back to Inbox
        </Link>

        <div className="user-icon">
          👤
        </div>

        <h1>

          {username}'s Public Profile

        </h1>

        <p>

          Questions that have been answered.

        </p>

        {messages.length === 0 ? (

          <p>

            No answered questions yet.

          </p>

        ) : (

          messages.map((message) => (

            <div

              key={message.id}

              className="profile-message"

            >

              <h3>

                💬 Question

              </h3>

              <p>

                {message.question}

              </p>

              <h3

                style={{ marginTop: "15px" }}

              >

                ✅ Reply

              </h3>

              <p>

                {message.answer}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  )

}

function AnswerQuestion() {

  const { id } = useParams()

  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {

    loadQuestion()

  }, [])

  async function loadQuestion() {

    const { data, error } = await supabase

      .from("messages")

      .select("*")

      .eq("id", Number(id))

      .single()

    console.log("URL ID:", id)
    console.log(data)
    console.log(error)

    if (error) {

      console.log(error)

      return

    }

    setQuestion(data)

  }

  async function submitAnswer(event) {

    event.preventDefault()

    if (!answer.trim()) {

      alert("Please write an answer.")

      return

    }

    const { error } = await supabase

      .from("messages")

      .update({

        answer: answer.trim(),

        replied: true

      })

      .eq("id", Number(id))

    if (error) {

      alert(error.message)

      return

    }

    setQuestion({

      ...question,

      answer: answer.trim(),

      replied: true

    })

    setSent(true)

    setAnswer("")

  }

  if (!question) {

    return (

      <div className="user-page">

        <div className="user-card">

          <h1>Question not found</h1>

        </div>

      </div>

    )

  }

  return (

    <div className="user-page">

      <div className="user-card">

        <h1>Anonymous Question</h1>

        <p>{question.question}</p>

        <form onSubmit={submitAnswer}>

          <textarea

            placeholder="Write your answer..."

            value={answer}

            onChange={(event) => {

              setAnswer(event.target.value)

            }}

          />

          <button

            type="submit"

            className="send-message-button"

          >

            Submit Answer

          </button>

        </form>

        {sent && (

          <div className="success-message">

            ✅ Your answer has been sent anonymously!

          </div>

        )}

      </div>

    </div>

  )

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create"
          element={<CreateLink />}
        />

        <Route
          path="/user/:username"
          element={<UserPage />}
        />

        <Route
          path="/inbox/:username"
          element={<Inbox />}
        />

        <Route
          path="/message/:username/:id"
          element={<MessageDetails />}
        />

        <Route
          path="/profile/:username"
          element={<Profile />}
        />

        <Route
  path="/question/:id"
  element={<AnswerQuestion />}
/>

      </Routes>

    </BrowserRouter>

  )

}

export default App