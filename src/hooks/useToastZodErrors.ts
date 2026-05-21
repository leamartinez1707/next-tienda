'use client'

import { ZodIssue } from 'zod'
import { toast } from 'react-toastify'

export const useToastZodErrors = () => {
  const showIssues = (issues: ZodIssue[]) => {
    issues.forEach((issue) => {
      toast.error(issue.message)
    })
  }

  return { showIssues }
}
