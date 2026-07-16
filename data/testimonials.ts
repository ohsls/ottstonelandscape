export type Testimonial = {
  id:           string
  name:         string
  neighbourhood:string
  stars:        number
  quote:        string
  projectType:  string
}

export const testimonials: Testimonial[] = [
  { id:'1', name:'David L.', neighbourhood:'Manotick',      stars:5, projectType:'Interlock Driveway',    quote:'Dim was on-site every single day. The base engineering on our driveway is bulletproof — after two winters it looks exactly like day one. No heaving, no shifting. Worth every dollar.' },
  { id:'2', name:'Sarah K.', neighbourhood:'Kanata Lakes',  stars:5, projectType:'Backyard Patio',        quote:'We had quotes from three other companies. OttStone was not the cheapest — and after seeing the result we understand exactly why. The quality difference is visible from 50 feet away.' },
  { id:'3', name:'Jean-François M.', neighbourhood:'Orléans', stars:5, projectType:'Retaining Wall',    quote:'They pulled the permit, handled the drainage grading, and finished two days ahead of schedule. No surprises on the final invoice. If you have a serious project, these are your guys.' },
]
