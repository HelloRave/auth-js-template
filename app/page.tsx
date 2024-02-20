import { signIn } from "@/auth";

export default function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button>Google</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('credentials');
        }}
      >
        <button>Credentials</button>
      </form>
    </div>
  );
}
