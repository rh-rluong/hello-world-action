import * as core from "@actions/core";
import * as github from "@actions/github";
import { Context } from "@actions/github/lib/context";

async function action(context = github.context) {
  try {
    const welcomeMessage = core.getInput("welcome-message", {
      required: true,
    });
    const repoToken = core.getInput("repo-token", { required: true });
    const issue = github.context.issue;

    if (github.context.payload.action !== "opened") {
      console.log("No issue or PR was opened, skipping");
      return;
    }
    const client = new github.GitHub(repoToken);
    await client.issues.createComment({
      owner: issue.owner,
      repo: issue.repo,
      issue_number: issue.number,
      body: welcomeMessage,
    });
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

action();
