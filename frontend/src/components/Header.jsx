import React from "react";

export default function Header() {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-blue-600 bg-blue-600 bg-clip-text">
        TodoX
      </h1>

      <p className="text-muted-foreground">
        Không có việc gì khó, chỉ sợ mình không làm 💪
      </p>
    </div>
  );
}
