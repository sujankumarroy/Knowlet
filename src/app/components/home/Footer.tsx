export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white text-center py-6 text-sm">
      <p>© 2025 Knowlet | All rights reserved</p>

      <div className="mt-2 space-x-2">
        <a className="text-blue-300" href="mailto:knowlet.study@gmail.com">
          Email
        </a>
        <a className="text-blue-300" href="/dev-log">
          Dev Log
        </a>
        <a className="text-blue-300" href="/about">
          About
        </a>
        <a className="text-blue-300" href="/help">
          Help
        </a>
      </div>
    </footer>
  );
}
