import React from 'react'

export default function Footer() {
  return (
    <footer style={styles}>
      Copyright @ {new Date().getFullYear()}
    </footer>
  )
}

const styles = {
  color: "var(--white-color)",
  fontSize: "21px",
  backgroundColor: "var(--blue-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  padding: "35px 0"
}