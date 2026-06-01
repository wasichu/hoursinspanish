#!/usr/bin/env elixir

defmodule CheckHoursDrafts do
  def main do
    staged_files()
    |> Enum.filter(&hours_post?/1)
    |> Enum.filter(&draft_post?/1)
    |> handle_result()
  end

  defp staged_files do
    {output, 0} =
      System.cmd("git", ["diff", "--cached", "--name-only"])

    output
    |> String.split("\n", trim: true)
    |> Enum.map(&Path.split/1)
  end

  defp hours_post?(["content", "hours" | rest]) do
    rest
    |> Path.join()
    |> Path.extname()
    |> Kernel.==(".md")
  end

  defp hours_post?(_path_parts), do: false

  defp draft_post?(path_parts) do
    path = Path.join(path_parts)

    case System.cmd("git", ["show", ":#{path}"], stderr_to_stdout: true) do
      {content, 0} ->
        String.contains?(content, "draft = true")

      {_message, _status} ->
        false
    end
  end

  defp handle_result([]), do: :ok

  defp handle_result(draft_posts) do
    print_warning(draft_posts)
    abort()
  end

  defp print_warning(draft_posts) do
    IO.puts("""

    🚨 Draft hours posts detected:

    #{format_paths(draft_posts)}

    Set draft = false before committing.
    Or bypass with: git commit --no-verify
    """)
  end

  defp format_paths(paths) do
    paths
    |> Enum.map(fn path_parts -> "  • #{Path.join(path_parts)}" end)
    |> Enum.join("\n")
  end

  defp abort, do: System.halt(1)
end

CheckHoursDrafts.main()
